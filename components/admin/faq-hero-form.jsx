"use client";

import { useState } from "react";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import {
 normalizePageHeroImages,
 PAGE_HERO_DEFAULT_IMAGE,
} from "@/lib/content/page-hero-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ_HERO_UPLOAD_FOLDER = "sss";

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizePageHeroImages(initial.contentTr),
  contentEn: normalizePageHeroImages(initial.contentEn),
 };
}

function stripHeroFields(content) {
 const { heroImages, ...editable } = content;
 return editable;
}

export function FaqHeroForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [uploadingHero, setUploadingHero] = useState(false);

 const heroImage = form.contentTr.heroImage ?? "";

 function syncForm({ contentTr, contentEn }) {
  setForm((current) => ({ ...current, contentTr, contentEn }));
 }

 return (
  <Card>
   <CardHeader>
    <CardTitle>SSS Başlık Görseli</CardTitle>
   </CardHeader>
   <CardContent className="space-y-6">
    <AdminPageHeroImages
     heroImage={heroImage}
     defaultImage={PAGE_HERO_DEFAULT_IMAGE.faq}
     uploadFolder={FAQ_HERO_UPLOAD_FOLDER}
     contentKey="faq"
     getContentTr={() => form.contentTr}
     getContentEn={() => form.contentEn}
     stripContent={stripHeroFields}
     onFormSync={syncForm}
     uploading={uploadingHero}
     onUploadingChange={setUploadingHero}
    />
   </CardContent>
  </Card>
 );
}
