"use client";

import { AdminImageUpload } from "@/components/admin/admin-image-upload";
import { saveContentBlock } from "@/components/admin/content-block-save";
import {
 getPageHeroImageHint,
 PAGE_HERO_IMAGE,
} from "@/lib/admin/image-specs";
import { validateImageUploadFile } from "@/lib/admin/image-upload";
import {
 mergePageHeroImage,
 normalizePageHeroImages,
} from "@/lib/content/page-hero-images";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AdminPageHeroImages({
 heroImage = "",
 defaultImage,
 uploadFolder,
 contentKey,
 getContentTr,
 getContentEn,
 stripContent,
 onFormSync,
 uploading = false,
 onUploadingChange,
}) {
 async function persistHeroImage(url) {
  const contentTr = mergePageHeroImage(getContentTr(), url);
  const contentEn = mergePageHeroImage(getContentEn(), url);

  if (!contentKey) {
   onFormSync({ contentTr, contentEn });
   return;
  }

  const saved = await saveContentBlock(
   contentKey,
   stripContent(contentTr),
   stripContent(contentEn)
  );

  onFormSync({
   contentTr: normalizePageHeroImages(saved.contentTr),
   contentEn: normalizePageHeroImages(saved.contentEn),
  });
 }

 async function uploadHeroImage(file) {
  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  onUploadingChange(true);
  try {
   const body = new FormData();
   body.append("file", file);
   body.append("folder", uploadFolder);

   const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Yükleme başarısız");
   if (!data.url) throw new Error("Yüklenen görsel adresi alınamadı");

   await persistHeroImage(data.url);
   toast.success("Başlık görseli kaydedildi");
  } catch (error) {
   toast.error(error.message || "Görsel kaydedilemedi");
  } finally {
   onUploadingChange(false);
  }
 }

 async function removeHeroImage() {
  onUploadingChange(true);
  try {
   await persistHeroImage("");
   toast.success("Başlık görseli kaldırıldı");
  } catch (error) {
   toast.error(error.message || "Görsel kaldırılamadı");
  } finally {
   onUploadingChange(false);
  }
 }

 const heroHint = getPageHeroImageHint();

 return (
  <div className="space-y-3">
   <div className="space-y-1">
    <Label className="text-sm font-medium">Başlık arkaplan görseli</Label>
    <p className="text-xs text-muted-foreground">{heroHint.lead}</p>
    <p className="text-xs text-muted-foreground">{heroHint.specs}</p>
   </div>

   <AdminImageUpload
    label="Hero görseli"
    value={heroImage}
    defaultPreview={defaultImage}
    onChange={(url) => {
     if (url === "") void removeHeroImage();
    }}
    onUpload={uploadHeroImage}
    uploading={uploading}
    hint=""
    previewAspectClass={PAGE_HERO_IMAGE.previewAspectClass}
    previewHeightClass="h-48"
    fullWidth
   />
  </div>
 );
}
