export const PAGE_HERO_IMAGE_KEYS = ["sm", "sm2x", "md", "lg", "xl", "xl2x"];

export const PAGE_HERO_DEFAULTS = {
 about: {
  sm: "/about-visual/mobile.png",
  sm2x: "/about-visual/mobile-2x.png",
  md: "/about-visual/tablet.png",
  lg: "/about-visual/laptop.png",
  xl: "/about-visual/genis-ekran.png",
  xl2x: "/about-visual/genis-ekran-2x.png",
 },
 missionVision: {
  sm: "/mission-hero/mobile.jpeg",
  sm2x: "/mission-hero/mobile.jpeg",
  md: "/mission-hero/tablet.jpeg",
  lg: "/mission-hero/laptop.jpeg",
  xl: "/mission-hero/genis-ekran.jpeg",
  xl2x: "/mission-hero/genis-ekran.jpeg",
 },
 faq: {
  sm: "/faq-hero/mobile.png",
  sm2x: "/faq-hero/mobile-2x.png",
  md: "/faq-hero/tablet.png",
  lg: "/faq-hero/laptop.png",
  xl: "/faq-hero/genis-ekran.png",
  xl2x: "/faq-hero/genis-ekran-2x.png",
 },
};

export const PAGE_HERO_DEFAULT_IMAGE = {
 about: PAGE_HERO_DEFAULTS.about.xl,
 missionVision: PAGE_HERO_DEFAULTS.missionVision.xl,
 faq: PAGE_HERO_DEFAULTS.faq.xl,
};

export const EMPTY_PAGE_HERO_IMAGES = Object.fromEntries(
 PAGE_HERO_IMAGE_KEYS.map((key) => [key, ""])
);

const HERO_IMAGE_FALLBACK_KEYS = ["xl", "lg", "md", "sm"];

export function hasAnyPageHeroImage(heroImages) {
 if (!heroImages) return false;
 return PAGE_HERO_IMAGE_KEYS.some((key) => heroImages[key]?.trim());
}

function pickLegacyHeroImage(heroImages) {
 for (const key of HERO_IMAGE_FALLBACK_KEYS) {
  const url = heroImages[key]?.trim();
  if (url) return url;
 }
 return "";
}

export function normalizePageHeroImages(content = {}) {
 const heroImages = {
  ...EMPTY_PAGE_HERO_IMAGES,
  ...(content.heroImages ?? {}),
 };

 let heroImage = content.heroImage?.trim() || "";

 if (!heroImage) {
  heroImage = pickLegacyHeroImage(heroImages);
 }

 if (heroImage) {
  return {
   ...content,
   heroImage,
   heroImages: Object.fromEntries(
    PAGE_HERO_IMAGE_KEYS.map((key) => [key, heroImage])
   ),
  };
 }

 return { ...content, heroImage: "", heroImages };
}

export function mergePageHeroImage(content = {}, url) {
 const trimmed = url?.trim() ?? "";

 if (!trimmed) {
  return {
   ...content,
   heroImage: "",
   heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
  };
 }

 return {
  ...content,
  heroImage: trimmed,
  heroImages: Object.fromEntries(
   PAGE_HERO_IMAGE_KEYS.map((key) => [key, trimmed])
  ),
 };
}

export function resolvePageHeroImage(page, content = {}) {
 const normalized = normalizePageHeroImages(content);
 if (normalized.heroImage) return normalized.heroImage;

 const defaults = PAGE_HERO_DEFAULTS[page] ?? PAGE_HERO_DEFAULTS.about;
 return PAGE_HERO_DEFAULT_IMAGE[page] ?? defaults.xl;
}

export function resolvePageHeroImages(page, content = {}) {
 const normalized = normalizePageHeroImages(content);

 if (normalized.heroImage) {
  return Object.fromEntries(
   PAGE_HERO_IMAGE_KEYS.map((key) => [key, normalized.heroImage])
  );
 }

 return { ...(PAGE_HERO_DEFAULTS[page] ?? PAGE_HERO_DEFAULTS.about) };
}
