"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { DeleteButton } from "@/components/admin/delete-button";
import {
 ADMIN_COLLECTION_NAME_FIELDS_HINT,
 applyAdminCollectionNameLimits,
 clampAdminCollectionName,
 MAX_ADMIN_COLLECTION_NAME_LENGTH,
 validateAdminCollectionName,
 validateAdminCollectionNameEn,
} from "@/lib/admin/field-limits";
import { slugify } from "@/lib/admin/slug";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyCollection = {
 name: "",
 nameEn: "",
 slug: "",
 sortOrder: 0,
 isPublished: true,
};

export function CollectionForm({ collection = null }) {
 const router = useRouter();
 const [form, setForm] = useState(() =>
  collection ? applyAdminCollectionNameLimits(collection) : emptyCollection
 );
 const [loading, setLoading] = useState(false);
 const isEdit = Boolean(collection?.id);

 function updateField(field, value) {
  setForm((current) => {
   const nextValue =
    field === "name" || field === "nameEn" ? clampAdminCollectionName(value) : value;
   const next = { ...current, [field]: nextValue };
   if (field === "name") {
    next.slug = slugify(nextValue);
   }
   return next;
  });
 }

 async function handleSubmit(event) {
  event.preventDefault();

  const nameError = validateAdminCollectionName(form.name, "Ad (TR)");
  if (nameError) {
   toast.error(nameError);
   return;
  }

  const nameEnError = validateAdminCollectionNameEn(form.nameEn);
  if (nameEnError) {
   toast.error(nameEnError);
   return;
  }

  setLoading(true);

  try {
   const response = await fetch(
    isEdit ? `/api/admin/collections/${collection.id}` : "/api/admin/collections",
    {
     method: isEdit ? "PUT" : "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      name: form.name,
      nameEn: form.nameEn,
      slug: slugify(form.name),
      sortOrder: form.sortOrder,
      isPublished: form.isPublished,
     }),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi");

   toast.success(isEdit ? "Koleksiyon güncellendi" : "Koleksiyon oluşturuldu.");
   router.push(isEdit ? `/admin/collections/${data.id}` : "/admin/collections");
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
     <CardTitle>{isEdit ? "Koleksiyon Düzenle" : "Yeni Koleksiyon"}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4 md:grid-cols-10">
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="name">Ad (TR)</Label>
      <Input
       id="name"
       value={form.name}
       onChange={(e) => updateField("name", e.target.value)}
       maxLength={MAX_ADMIN_COLLECTION_NAME_LENGTH}
      />
     </div>
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="nameEn">Ad (EN)</Label>
      <Input
       id="nameEn"
       value={form.nameEn ?? ""}
       onChange={(e) => updateField("nameEn", e.target.value)}
       maxLength={MAX_ADMIN_COLLECTION_NAME_LENGTH}
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
     <p className="text-xs text-muted-foreground md:col-span-8">{ADMIN_COLLECTION_NAME_FIELDS_HINT}</p>
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
      href={`/api/admin/collections/${collection.id}`}
      confirmTitle="Koleksiyonu sil?"
      confirmDescription="Koleksiyona bağlı tüm ürünler de silinir."
      redirectTo="/admin/collections"
     />
    ) : (
     <div />
    )}
    <Button type="submit" className="cursor-pointer gap-2" disabled={loading}>
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
