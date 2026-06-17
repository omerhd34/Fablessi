"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { AdminImageUpload } from "@/components/admin/admin-image-upload";
import { handleContentSave } from "@/components/admin/content-block-save";
import {
 getFaqHeroImageRequirements,
 getFaqHeroImageSummary,
} from "@/lib/admin/image-specs";
import { validateImageUploadFile } from "@/lib/admin/image-upload";
import { PAGE_HERO_DEFAULT_PREVIEW } from "@/lib/content/page-hero-defaults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ_HERO_UPLOAD_FOLDER = "sss";

export function FaqHeroForm({ initial }) {
 const [form, setForm] = useState(initial);
 const [loading, setLoading] = useState(false);
 const [uploadingHero, setUploadingHero] = useState(false);

 const heroImage = form.contentTr.heroImage ?? "";

 function updateHeroImage(url) {
  setForm((current) => ({
   ...current,
   contentTr: { ...current.contentTr, heroImage: url },
   contentEn: { ...current.contentEn, heroImage: url },
  }));
 }

 async function uploadHeroImage(file) {
  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  setUploadingHero(true);
  try {
   const body = new FormData();
   body.append("file", file);
   body.append("folder", FAQ_HERO_UPLOAD_FOLDER);

   const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Yükleme başarısız");

   updateHeroImage(data.url);
   toast.success("Başlık arkaplan görseli yüklendi");
  } catch (error) {
   toast.error(error.message);
  } finally {
   setUploadingHero(false);
  }
 }

 return (
  <form
   className="space-y-4"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "faq",
     { heroImage: form.contentTr.heroImage ?? "" },
     { heroImage: form.contentEn.heroImage ?? "" },
     setLoading,
     "SSS başlık görseli"
    );
   }}
  >
   <Card>
    <CardHeader>
     <CardTitle>SSS Başlık Görseli</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
     <AdminImageUpload
      label="Başlık arkaplan görseli"
      value={heroImage}
      defaultPreview={PAGE_HERO_DEFAULT_PREVIEW.faq}
      onChange={updateHeroImage}
      onUpload={uploadHeroImage}
      uploading={uploadingHero}
      hint={getFaqHeroImageSummary()}
      dropzoneHint={getFaqHeroImageRequirements()}
      previewAspectClass="aspect-3/1"
     />
    </CardContent>
   </Card>

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Görseli kaydet"}
   </Button>
  </form>
 );
}
