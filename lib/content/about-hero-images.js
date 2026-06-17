import {
 EMPTY_PAGE_HERO_IMAGES,
 PAGE_HERO_DEFAULT_IMAGE,
 PAGE_HERO_DEFAULTS,
 PAGE_HERO_IMAGE_KEYS,
 hasAnyPageHeroImage,
 normalizePageHeroImages,
 resolvePageHeroImage,
 resolvePageHeroImages,
} from "./page-hero-images";

export const ABOUT_HERO_IMAGE_KEYS = PAGE_HERO_IMAGE_KEYS;
export const ABOUT_HERO_DEFAULT_IMAGES = PAGE_HERO_DEFAULTS.about;
export const ABOUT_HERO_DEFAULT_IMAGE = PAGE_HERO_DEFAULT_IMAGE.about;
export const EMPTY_ABOUT_HERO_IMAGES = EMPTY_PAGE_HERO_IMAGES;

export const hasAnyAboutHeroImage = hasAnyPageHeroImage;
export const normalizeAboutHeroImages = normalizePageHeroImages;

export function resolveAboutHeroImages(content) {
 return resolvePageHeroImages("about", content);
}

export { resolvePageHeroImage };
