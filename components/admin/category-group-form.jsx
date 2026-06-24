"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { DeleteButton } from "@/components/admin/delete-button";
import { AdminImageUpload } from "@/components/admin/admin-image-upload";
import {
 ADMIN_CATEGORY_NAME_FIELDS_HINT,
 applyAdminCategoryNameLimits,
 clampAdminCategoryName,
 MAX_ADMIN_CATEGORY_NAME_LENGTH,
 validateAdminCategoryName,
 validateAdminCategoryNameEn,
} from "@/lib/admin/field-limits";
import {
 ADMIN_DRAFT_UPLOAD_FOLDER,
 validateImageUploadFile,
} from "@/lib/admin/image-upload";
import {
 getCategoryCoverImageRequirements,
 getCategoryCoverImageSummary,
} from "@/lib/admin/image-specs";
import { slugify } from "@/lib/admin/slug";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyCategoryGroup = {
 name: "",
 nameEn: "",
 slug: "",
 coverImage: "",
 sortOrder: 0,
 isPublished: true,
};

function getDefaultCoverPreview(categoryGroup) {
 if (!categoryGroup || categoryGroup.coverImage) return "";

 const firstProduct = categoryGroup.products?.[0];
 return firstProduct?.images?.[0]?.url ?? "";
}

export function CategoryGroupForm({ categoryGroup = null }) {
 const router = useRouter();
 const [form, setForm] = useState(() =>
  categoryGroup ? applyAdminCategoryNameLimits(categoryGroup) : emptyCategoryGroup
 );
 const [loading, setLoading] = useState(false);
 const [uploading, setUploading] = useState(false);
 const isEdit = Boolean(categoryGroup?.id);
 const defaultCoverPreview = useMemo(
  () => getDefaultCoverPreview(categoryGroup),
  [categoryGroup]
 );

 function getCoverUploadFolder(currentForm) {
  if (currentForm.coverImage) {
   const parts = currentForm.coverImage.split("/").filter(Boolean);
   if (parts.length >= 2) return parts[0];
  }

  return slugify(currentForm.name) || ADMIN_DRAFT_UPLOAD_FOLDER;
 }

 function updateField(field, value) {
  setForm((current) => {
   const nextValue =
    field === "name" || field === "nameEn" ? clampAdminCategoryName(value) : value;
   const next = { ...current, [field]: nextValue };
   if (field === "name") {
    next.slug = slugify(nextValue);
   }
   return next;
  });
 }

 async function uploadCoverImage(file) {
  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  const folder = getCoverUploadFolder(form);

  setUploading(true);
  try {
   const body = new FormData();
   body.append("file", file);
   body.append("folder", folder);

   const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Yükleme başarısız");

   updateField("coverImage", data.url);
   toast.success("Kapak görseli yüklendi");
  } catch (error) {
   toast.error(error.message);
  } finally {
   setUploading(false);
  }
 }

 async function handleSubmit(event) {
  event.preventDefault();

  const nameError = validateAdminCategoryName(form.name, "Ad (TR)");
  if (nameError) {
   toast.error(nameError);
   return;
  }

  const nameEnError = validateAdminCategoryNameEn(form.nameEn);
  if (nameEnError) {
   toast.error(nameEnError);
   return;
  }

  setLoading(true);

  try {
   const response = await fetch(
    isEdit
     ? `/api/admin/category-groups/${categoryGroup.id}`
     : "/api/admin/category-groups",
    {
     method: isEdit ? "PUT" : "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      name: form.name,
      nameEn: form.nameEn,
      slug: slugify(form.name),
      coverImage: form.coverImage,
      sortOrder: form.sortOrder,
      isPublished: form.isPublished,
     }),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi");

   toast.success(isEdit ? "Kategori grubu güncellendi" : "Kategori grubu oluşturuldu.");

   if (isEdit) {
    router.push(`/admin/categories/${data.id}`);
   } else {
    router.replace("/admin/categories");
   }

   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 return (
  <form onSubmit={handleSubmit} noValidate className="space-y-6">
   <Card>
    <CardHeader>
     <CardTitle>{isEdit ? "Kategori Grubu Düzenle" : "Yeni Kategori Grubu"}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4 md:grid-cols-10">
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="name">Ad (TR)</Label>
      <Input
       id="name"
       value={form.name}
       onChange={(e) => updateField("name", e.target.value)}
       maxLength={MAX_ADMIN_CATEGORY_NAME_LENGTH}
      />
     </div>
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="nameEn">Ad (EN)</Label>
      <Input
       id="nameEn"
       value={form.nameEn ?? ""}
       onChange={(e) => updateField("nameEn", e.target.value)}
       maxLength={MAX_ADMIN_CATEGORY_NAME_LENGTH}
      />
     </div>
     <div className="space-y-2 md:col-span-2">
      <Label htmlFor="sortOrder">Sıra</Label>
      <Input
       id="sortOrder"
       type="number"
       value={form.sortOrder ?? 0}
       onChange={(e) => updateField("sortOrder", Number(e.target.value))}
      />
     </div>
     <p className="text-xs text-muted-foreground md:col-span-8">{ADMIN_CATEGORY_NAME_FIELDS_HINT}</p>
     <div className="md:col-span-10">
      <AdminImageUpload
       value={form.coverImage ?? ""}
       defaultPreview={defaultCoverPreview}
       onChange={(value) => updateField("coverImage", value)}
       onUpload={uploadCoverImage}
       uploading={uploading}
       hint={getCategoryCoverImageSummary()}
       dropzoneHint={getCategoryCoverImageRequirements()}
      />
     </div>
     <label className="flex cursor-pointer items-center gap-2 md:col-span-10">
      <Checkbox
       checked={form.isPublished !== false}
       onCheckedChange={(checked) => updateField("isPublished", Boolean(checked))}
      />
      <span className="text-sm">Yayında</span>
     </label>
    </CardContent>
   </Card>

   <div className="flex items-center justify-between gap-3">
    {isEdit ? (
     <DeleteButton
      href={`/api/admin/category-groups/${categoryGroup.id}`}
      confirmTitle="Kategori grubunu sil?"
      confirmDescription="Bu gruba bağlı ürünlerin kategori bilgisi kaldırılır."
      redirectTo="/admin/categories"
      iconOnly={false}
     />
    ) : (
     <div />
    )}
    <Button type="submit" className="cursor-pointer gap-2" disabled={loading || uploading}>
     {loading ? (
      "Kaydediliyor…"
     ) : isEdit ? (
      <>
       <MdSave className="size-4" />
       Güncelle
      </>
     ) : (
      "Oluştur"
     )}
    </Button>
   </div>
  </form>
 );
}
