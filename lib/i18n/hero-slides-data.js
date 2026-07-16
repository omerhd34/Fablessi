const HERO_SLIDE_FILES = {
 sm: "1080x1920.webp",
 md: "1440x2560.webp",
 lg: "1600x1067.webp",
 xl: "1920x1280.webp",
 "2xl": "2560x1707.webp",
};

function buildSlideImages(folder) {
 return Object.fromEntries(
  Object.entries(HERO_SLIDE_FILES).map(([breakpoint, file]) => [
   breakpoint,
   `/slayts/${folder}/${file}`,
  ])
 );
}

export const heroSlidesData = [
 { slug: "slide-1", images: buildSlideImages("1") },
 { slug: "slide-2", images: buildSlideImages("2") },
 { slug: "slide-3", images: buildSlideImages("3") },
 { slug: "slide-4", images: buildSlideImages("4") },
];

export function buildHeroSlides(dictionary) {
 if (dictionary.hero.slidesData?.length) {
  return dictionary.hero.slidesData;
 }

 return heroSlidesData.map((slide) => ({
  key: slide.slug,
  images: slide.images,
  alt: dictionary.hero.slides[slide.slug].alt,
 }));
}
