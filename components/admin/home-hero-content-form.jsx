"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import {
 AdminHeroSlideImage,
 getHomeHeroSlideImageHint,
} from "@/components/admin/admin-hero-slide-image";
import { handleContentSave } from "@/components/admin/content-block-save";
import {
 HOME_HERO_SLIDE_DEFAULT_IMAGE,
 HOME_HERO_SLIDE_SLUGS,
 getHomeHeroSlideNumber,
 normalizeHomeHeroContent,
} from "@/lib/content/home-hero-slides";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HOME_HERO_UPLOAD_FOLDER = "anasayfa-hero";

export function stripHeroLockedFields(content) {
 return {
  slides:
   content.slides?.map(({ heroImages, ...slide }) => slide) ??
   HOME_HERO_SLIDE_SLUGS.map((slug) => ({ slug, heroImage: "", alt: "" })),
 };
}

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizeHomeHeroContent(initial.contentTr),
  contentEn: normalizeHomeHeroContent(initial.contentEn),
 };
}

function updateSlideAlt(content, slug, value) {
 const slides = [...(content.slides ?? [])];
 const slideIndex = slides.findIndex((slide) => slide.slug === slug);
 if (slideIndex === -1) return content;

 slides[slideIndex] = { ...slides[slideIndex], alt: value };
 return { ...content, slides };
}

function getSlideBySlug(content, slug) {
 return content.slides?.find((slide) => slide.slug === slug);
}

export function HomeHeroFields({
 form,
 setForm,
 uploadingSlideSlug,
 setUploadingSlideSlug,
}) {
 const heroHint = getHomeHeroSlideImageHint();

 function updateLocale(locale, updater) {
  setForm((current) => ({
   ...current,
   [locale]: updater(current[locale]),
  }));
 }

 return (
  <>
   <Card>
    <CardHeader>
     <CardTitle>Hero Slayt Görselleri</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
     <p className="text-xs text-muted-foreground">{heroHint.lead}</p>
     <p className="text-xs text-muted-foreground">{heroHint.specs}</p>
    </CardContent>
   </Card>

   <div className="grid gap-4 lg:grid-cols-2">
    {HOME_HERO_SLIDE_SLUGS.map((slug) => {
     const slideNumber = getHomeHeroSlideNumber(slug);
     const slide = getSlideBySlug(form.contentTr, slug);
     const heroImage = slide?.heroImage ?? "";

     return (
      <Card key={slug} className="h-full">
       <CardHeader>
        <CardTitle>Slayt {slideNumber}</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6">
        <AdminHeroSlideImage
         slideSlug={slug}
         heroImage={heroImage}
         defaultImage={HOME_HERO_SLIDE_DEFAULT_IMAGE[slug]}
         uploadFolder={`${HOME_HERO_UPLOAD_FOLDER}/${slideNumber}`}
         contentKey="homeHero"
         getContentTr={() => form.contentTr}
         getContentEn={() => form.contentEn}
         stripContent={stripHeroLockedFields}
         onFormSync={({ contentTr, contentEn }) =>
          setForm((current) => ({ ...current, contentTr, contentEn }))
         }
         uploading={uploadingSlideSlug === slug}
         onUploadingChange={(isUploading) =>
          setUploadingSlideSlug(isUploading ? slug : null)
         }
         label={`Slayt ${slideNumber} görseli`}
        />

        <div className="grid gap-4 xl:grid-cols-2">
         <div className="space-y-2">
          <Label>Görsel alt metni (TR)</Label>
          <Input
           value={slide?.alt ?? ""}
           onChange={(e) =>
            updateLocale("contentTr", (content) =>
             updateSlideAlt(content, slug, e.target.value)
            )
           }
          />
         </div>
         <div className="space-y-2">
          <Label>Image alt text (EN)</Label>
          <Input
           value={getSlideBySlug(form.contentEn, slug)?.alt ?? ""}
           onChange={(e) =>
            updateLocale("contentEn", (content) =>
             updateSlideAlt(content, slug, e.target.value)
            )
           }
          />
         </div>
        </div>
       </CardContent>
      </Card>
     );
    })}
   </div>
  </>
 );
}

export function HomeHeroContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingSlideSlug, setUploadingSlideSlug] = useState(null);

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "homeHero",
     stripHeroLockedFields(form.contentTr),
     stripHeroLockedFields(form.contentEn),
     setLoading,
     "Anasayfa hero slaytları"
    );
   }}
  >
   <HomeHeroFields
    form={form}
    setForm={setForm}
    uploadingSlideSlug={uploadingSlideSlug}
    setUploadingSlideSlug={setUploadingSlideSlug}
   />

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Kaydet"}
   </Button>
  </form>
 );
}
