const HERO_SLIDE_FILES = {
 sm: "1080x1920.png",
 md: "1440x2560.png",
 lg: "2560x1707.jpg",
 xl: "3200x2133.jpg",
 "2xl": "3840x2560.jpg",
};

export const HOME_HERO_SLIDE_IMAGE_KEYS = ["sm", "md", "lg", "xl", "2xl"];

export const HOME_HERO_SLIDE_SLUGS = ["slide-1", "slide-2", "slide-3", "slide-4"];

export function getHomeHeroSlideNumber(slug) {
 return Number(slug.replace("slide-", ""));
}

export const EMPTY_HERO_SLIDE_IMAGES = Object.fromEntries(
 HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [key, ""])
);

function slideFolder(slug) {
 return slug.replace("slide-", "");
}

function buildDefaultSlideImages(slug) {
 const folder = slideFolder(slug);

 return Object.fromEntries(
  Object.entries(HERO_SLIDE_FILES).map(([breakpoint, file]) => [
   breakpoint,
   `/slayts/${folder}/${file}`,
  ])
 );
}

export const HOME_HERO_SLIDE_DEFAULTS = Object.fromEntries(
 HOME_HERO_SLIDE_SLUGS.map((slug) => [slug, buildDefaultSlideImages(slug)])
);

export const HOME_HERO_SLIDE_DEFAULT_IMAGE = Object.fromEntries(
 HOME_HERO_SLIDE_SLUGS.map((slug) => [slug, HOME_HERO_SLIDE_DEFAULTS[slug].lg])
);

const HERO_IMAGE_FALLBACK_KEYS = ["lg", "xl", "2xl", "md", "sm"];

export function getDefaultHomeHeroSlides(dictionary) {
 return HOME_HERO_SLIDE_SLUGS.map((slug) => ({
  slug,
  heroImage: "",
  heroImages: { ...EMPTY_HERO_SLIDE_IMAGES },
  alt: dictionary.hero.slides[slug]?.alt ?? "",
 }));
}

export function normalizeHeroSlide(slide = {}) {
 const heroImages = {
  ...EMPTY_HERO_SLIDE_IMAGES,
  ...(slide.heroImages ?? {}),
 };

 let heroImage = slide.heroImage?.trim() || "";

 if (!heroImage) {
  for (const key of HERO_IMAGE_FALLBACK_KEYS) {
   const url = heroImages[key]?.trim();
   if (url) {
    heroImage = url;
    break;
   }
  }
 }

 if (heroImage) {
  return {
   ...slide,
   heroImage,
   heroImages: Object.fromEntries(
    HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [key, heroImage])
   ),
  };
 }

 return { ...slide, heroImage: "", heroImages };
}

export function normalizeHomeHeroContent(content = {}) {
 const slides = content.slides?.length
  ? content.slides
  : HOME_HERO_SLIDE_SLUGS.map((slug) => ({ slug, heroImage: "", alt: "" }));

 return {
  ...content,
  slides: HOME_HERO_SLIDE_SLUGS.map((slug) => {
   const slide = slides.find((item) => item.slug === slug) ?? { slug };
   return normalizeHeroSlide(slide);
  }),
 };
}

export function mergeHeroSlideImage(slide, url) {
 const trimmed = url?.trim() ?? "";

 if (!trimmed) {
  return {
   ...slide,
   heroImage: "",
   heroImages: { ...EMPTY_HERO_SLIDE_IMAGES },
  };
 }

 return {
  ...slide,
  heroImage: trimmed,
  heroImages: Object.fromEntries(
   HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [key, trimmed])
  ),
 };
}

export function resolveHeroSlideImages(slug, slide = {}) {
 const normalized = normalizeHeroSlide(slide);

 if (normalized.heroImage) {
  return Object.fromEntries(
   HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [key, normalized.heroImage])
  );
 }

 return { ...(HOME_HERO_SLIDE_DEFAULTS[slug] ?? HOME_HERO_SLIDE_DEFAULTS["slide-1"]) };
}

export function buildHeroSlidesFromContent(content, baseDictionary) {
 const normalized = normalizeHomeHeroContent(content ?? {});

 return HOME_HERO_SLIDE_SLUGS.map((slug) => {
  const slide = normalized.slides.find((item) => item.slug === slug) ?? { slug };
  const normalizedSlide = normalizeHeroSlide(slide);

  return {
   key: slug,
   images: resolveHeroSlideImages(slug, normalizedSlide),
   alt: normalizedSlide.alt || baseDictionary.hero.slides[slug]?.alt || "",
  };
 });
}
