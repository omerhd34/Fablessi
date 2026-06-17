import { IMAGE_UPLOAD_MAX_SIZE_LABEL } from "@/lib/admin/image-upload";

export const COLLECTION_COVER_IMAGE = {
 width: 1600,
 height: 1000,
 aspectRatio: "16:10",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export const CATEGORY_HERO_IMAGE = {
 width: 1920,
 height: 640,
 aspectRatio: "3:1",
 previewAspectClass: "aspect-3/1",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export function getCollectionCoverImageSummary() {
 const { width, height, aspectRatio } = COLLECTION_COVER_IMAGE;

 return `${width} × ${height} px boyutunda, ${aspectRatio} en-boy oranlı yatay görsel yükleyin.`;
}

export function getCollectionCoverImageRequirements() {
 const { acceptedFormats, maxFileSize } = COLLECTION_COVER_IMAGE;

 return `Desteklenen formatlar: ${acceptedFormats.join(", ")} - En fazla ${maxFileSize}`;
}

export function getCollectionCoverImageHint() {
 return `${getCollectionCoverImageSummary()} ${getCollectionCoverImageRequirements()}`;
}

export function getCategoryHeroImageSummary() {
 const { width, height, aspectRatio } = CATEGORY_HERO_IMAGE;

 return `${width} × ${height} px boyutunda, ${aspectRatio} en-boy oranlı geniş yatay hero görseli yükleyin. Sol üst köşede beyaz logo görünür; bu bölge açık renk veya beyaza yakın olmamalıdır.`;
}

export function getCategoryHeroImageBrightnessWarning() {
 return "Sol üst köşedeki beyaz logo, açık tonlu bir arka planda kaybolur. Kontrast için bu bölümü koyu tutun veya daha koyu bir hero görseli seçin.";
}

export function getCategoryHeroImageRequirements() {
 const { acceptedFormats, maxFileSize } = CATEGORY_HERO_IMAGE;

 return `Desteklenen formatlar: ${acceptedFormats.join(", ")} - En fazla ${maxFileSize}`;
}

/** Tek hero görseli — object-cover ile tüm breakpoint’lerde kırpılır. */
export const PAGE_HERO_IMAGE = {
 width: 2400,
 height: 1350,
 aspectRatio: "16:9",
 previewAspectClass: "aspect-video",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export function getPageHeroImageHint() {
 const { width, height, aspectRatio, acceptedFormats, maxFileSize } = PAGE_HERO_IMAGE;

 return {
  lead:
   "Tek bir yatay görsel yükleyin; mobil, tablet ve masaüstünde otomatik kırpılarak uyum sağlar. Önemli içeriği görselin ortasına yerleştirin.",
  specs: `Önerilen: ${width} × ${height} px (${aspectRatio}) — ${acceptedFormats.join(", ")} — En fazla ${maxFileSize}`,
 };
}

export const FAQ_HERO_IMAGE = CATEGORY_HERO_IMAGE;

export function getFaqHeroImageSummary() {
 return getCategoryHeroImageSummary();
}

export function getFaqHeroImageRequirements() {
 return getCategoryHeroImageRequirements();
}

export const MISSION_HERO_IMAGE = CATEGORY_HERO_IMAGE;

export function getMissionHeroImageSummary() {
 return getCategoryHeroImageSummary();
}

export function getMissionHeroImageRequirements() {
 return getCategoryHeroImageRequirements();
}

/** Anasayfa hero slayt görseli — object-cover ile tüm breakpoint’lerde kırpılır. */
export const HOME_HERO_SLIDE_IMAGE = {
 width: 2560,
 height: 1707,
 aspectRatio: "3:2",
 previewAspectClass: "aspect-3/2",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export function getHomeHeroSlideImageHint() {
 const { width, height, aspectRatio, acceptedFormats, maxFileSize } =
  HOME_HERO_SLIDE_IMAGE;

 return {
  lead:
   "Tek bir görsel yükleyin; mobil, tablet ve masaüstünde otomatik kırpılarak tam ekran slayt olarak gösterilir. Önemli içeriği görselin ortasına yerleştirin.",
  specs: `Önerilen: ${width} × ${height} px (${aspectRatio}) — ${acceptedFormats.join(", ")} — En fazla ${maxFileSize}`,
 };
}
