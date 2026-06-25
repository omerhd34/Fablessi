"use client";

import { getImageProps } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { buildHeroSlides } from "@/lib/i18n/hero-slides-data";
import { headerGlassBtnClass } from "@/lib/layout/header-styles";
import { DESKTOP_LAYOUT_MQ } from "@/lib/layout/breakpoints";
import { cn } from "@/lib/utils";

const HERO_AUTOPLAY_MS = 12_000;

function isHeroDesktopViewport() {
 return window.matchMedia(DESKTOP_LAYOUT_MQ).matches;
}

const heroNavButtonClass = cn(
 headerGlassBtnClass,
 "absolute top-1/2 z-20 hidden desktop:inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white/96 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/45 active:scale-100 sm:size-[3.25rem] desktop:size-[3.75rem] [&_svg]:size-[1.375rem] md:[&_svg]:size-[1.875rem] [&_svg]:[stroke-width:3.5]"
);

const HERO_IMAGE_BREAKPOINTS = [
 { media: "(min-width: 96rem)", key: "2xl", width: 3840, height: 2560 },
 { media: "(min-width: 1440px)", key: "xl", width: 3200, height: 2133 },
 { media: "(min-width: 64rem)", key: "lg", width: 2560, height: 1707 },
 { media: "(min-width: 48rem)", key: "md", width: 1440, height: 2560 },
];

function HeroSlideImage({ slide, priority, className }) {
 const { images, alt } = slide;
 const imageSizes = "100vw";
 const shared = { alt, sizes: imageSizes, priority };

 const sources = HERO_IMAGE_BREAKPOINTS.map(({ media, key, width, height }) => {
  const { props } = getImageProps({
   ...shared,
   src: images[key],
   width,
   height,
  });

  return <source key={key} media={media} srcSet={props.srcSet} />;
 });

 const {
  props: { srcSet: _mobileSrcSet, ...imgProps },
 } = getImageProps({
  ...shared,
  src: images.sm,
  width: 1080,
  height: 1920,
 });

 return (
  <picture className="absolute inset-0 block h-full w-full">
   {sources}
   <img
    {...imgProps}
    alt={alt}
    className={cn("h-full w-full", className)}
    decoding={priority ? "sync" : "async"}
   />
  </picture>
 );
}

export function HeroSection() {
 const { dictionary, t } = useTranslations();
 const heroSlides = useMemo(
  () => buildHeroSlides(dictionary),
  [dictionary]
 );
 const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  duration: 30,
  watchDrag: () => !isHeroDesktopViewport(),
  dragFree: false,
 });
 const [selectedIndex, setSelectedIndex] = useState(0);
 const autoplayTimerRef = useRef(null);
 const autoplayRemainingRef = useRef(HERO_AUTOPLAY_MS);
 const autoplayStartedAtRef = useRef(0);

 useEffect(() => {
  if (!emblaApi) return;

  const desktopMediaQuery = window.matchMedia(DESKTOP_LAYOUT_MQ);
  const onBreakpointChange = () => emblaApi.reInit();

  desktopMediaQuery.addEventListener("change", onBreakpointChange);
  return () =>
   desktopMediaQuery.removeEventListener("change", onBreakpointChange);
 }, [emblaApi]);

 const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
 const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

 const clearAutoplayTimer = useCallback(() => {
  if (autoplayTimerRef.current !== null) {
   window.clearTimeout(autoplayTimerRef.current);
   autoplayTimerRef.current = null;
  }
 }, []);

 const scheduleAutoplay = useCallback(
  (delay = HERO_AUTOPLAY_MS) => {
   if (!emblaApi) return;

   clearAutoplayTimer();
   autoplayRemainingRef.current = delay;
   autoplayStartedAtRef.current = Date.now();

   if (document.hidden) return;

   autoplayTimerRef.current = window.setTimeout(() => {
    emblaApi.scrollNext();
   }, delay);
  },
  [clearAutoplayTimer, emblaApi]
 );

 const pauseAutoplay = useCallback(() => {
  if (autoplayTimerRef.current === null) return;

  const elapsed = Date.now() - autoplayStartedAtRef.current;
  autoplayRemainingRef.current = Math.max(
   0,
   autoplayRemainingRef.current - elapsed
  );
  clearAutoplayTimer();
 }, [clearAutoplayTimer]);

 const resumeAutoplay = useCallback(() => {
  if (!emblaApi || autoplayTimerRef.current !== null) return;
  scheduleAutoplay(autoplayRemainingRef.current);
 }, [emblaApi, scheduleAutoplay]);

 useEffect(() => {
  if (!emblaApi) return;

  const onSelect = () => {
   setSelectedIndex(emblaApi.selectedScrollSnap());
   scheduleAutoplay();
  };

  onSelect();
  const onPointerDown = () => clearAutoplayTimer();

  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", onSelect);
  emblaApi.on("pointerDown", onPointerDown);

  return () => {
   emblaApi.off("select", onSelect);
   emblaApi.off("reInit", onSelect);
   emblaApi.off("pointerDown", onPointerDown);
   clearAutoplayTimer();
  };
 }, [clearAutoplayTimer, emblaApi, scheduleAutoplay]);

 useEffect(() => {
  const onVisibilityChange = () => {
   if (document.hidden) {
    pauseAutoplay();
   } else {
    resumeAutoplay();
   }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  return () =>
   document.removeEventListener("visibilitychange", onVisibilityChange);
 }, [pauseAutoplay, resumeAutoplay]);

 return (
  <section className="hero-carousel relative w-full touch-pan-y">
   <div
    className="overflow-hidden select-none cursor-grab touch-pan-y pinch-zoom active:cursor-grabbing desktop:cursor-default desktop:touch-auto"
    ref={emblaRef}
   >
    <div className="flex">
     {heroSlides.map((slide, index) => (
      <div key={slide.key} className="relative min-w-0 flex-[0_0_100%]">
       <div className="relative min-h-dvh w-full">
        <HeroSlideImage
         slide={slide}
         priority={index === 0}
         className={cn("object-cover", slide.imagePosition ?? "object-center")}
        />
       </div>
      </div>
     ))}
    </div>
   </div>

   <button
    type="button"
    onClick={scrollPrev}
    className={cn(heroNavButtonClass, "left-2 sm:left-4 desktop:left-6")}
    aria-label={t("hero.prevSlide")}
   >
    <HeroChevronLeft
     className="size-5.5 text-current md:size-7.5"
     strokeWidth={3.5}
     aria-hidden
    />
   </button>
   <button
    type="button"
    onClick={scrollNext}
    className={cn(heroNavButtonClass, "right-2 sm:right-4 desktop:right-6")}
    aria-label={t("hero.nextSlide")}
   >
    <HeroChevronRight
     className="size-5.5 text-current md:size-7.5"
     strokeWidth={3.5}
     aria-hidden
    />
   </button>

   <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
    {heroSlides.map((slide, index) => (
     <button
      key={slide.key}
      type="button"
      onClick={() => emblaApi?.scrollTo(index)}
      className={cn(
       "h-1 cursor-pointer rounded-full bg-white/45 transition-all duration-300 hover:bg-white/70",
       selectedIndex === index ? "w-9 bg-white" : "w-7"
      )}
      aria-label={t("hero.slide", { n: index + 1 })}
      aria-current={selectedIndex === index ? "true" : undefined}
     />
    ))}
   </div>
  </section>
 );
}
