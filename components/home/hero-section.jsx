"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { buildHeroSlides } from "@/lib/i18n/hero-slides-data";
import { headerGlassBtnClass } from "@/lib/layout/header-styles";
import { cn } from "@/lib/utils";

const HERO_AUTOPLAY_MS = 12_000;
const HERO_DESKTOP_MQ = "(min-width: 1024px)";

const heroNavButtonClass = cn(
 headerGlassBtnClass,
 "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white/96 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/45 active:scale-100 sm:size-[3.25rem] lg:flex lg:size-[3.75rem] [&_svg]:size-[1.375rem] md:[&_svg]:size-[1.875rem] [&_svg]:[stroke-width:3.5]"
);

function HeroSlideImage({ slide, priority, className }) {
 const { images, alt } = slide;

 return (
  <picture className="absolute inset-0 block h-full w-full">
   <source media="(min-width: 96rem)" srcSet={images["2xl"]} />
   <source media="(min-width: 80rem)" srcSet={images.xl} />
   <source media="(min-width: 64rem)" srcSet={images.lg} />
   <source media="(min-width: 48rem)" srcSet={images.md} />
   <Image
    src={images.sm}
    alt={alt}
    fill
    priority={priority}
    sizes="100vw"
    className={className}
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
 const [dragEnabled, setDragEnabled] = useState(true);
 const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  duration: 30,
  watchDrag: dragEnabled,
  dragFree: false,
 });
 const [selectedIndex, setSelectedIndex] = useState(0);
 const autoplayTimerRef = useRef(null);
 const autoplayRemainingRef = useRef(HERO_AUTOPLAY_MS);
 const autoplayStartedAtRef = useRef(0);

 useEffect(() => {
  const desktopMediaQuery = window.matchMedia(HERO_DESKTOP_MQ);
  const updateDragEnabled = () => setDragEnabled(!desktopMediaQuery.matches);

  updateDragEnabled();
  desktopMediaQuery.addEventListener("change", updateDragEnabled);

  return () => {
   desktopMediaQuery.removeEventListener("change", updateDragEnabled);
  };
 }, []);

 useEffect(() => {
  if (!emblaApi) return;
  emblaApi.reInit({ watchDrag: dragEnabled });
  emblaApi.scrollTo(0, true);
 }, [dragEnabled, emblaApi, heroSlides]);

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
    className={cn(
     "overflow-hidden select-none",
     dragEnabled
      ? "cursor-grab touch-pan-y pinch-zoom active:cursor-grabbing"
      : "cursor-default touch-auto active:cursor-default"
    )}
    ref={emblaRef}
   >
    <div className="flex">
     {heroSlides.map((slide, index) => (
      <div key={slide.key} className="relative min-w-0 flex-[0_0_100%]">
       <div className="relative min-h-dvh w-full sm:min-h-svh">
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
    className={cn(heroNavButtonClass, "left-2 sm:left-4 lg:left-6")}
    aria-label={t("hero.prevSlide")}
   >
    <HeroChevronLeft
     className="size-[1.375rem] text-current md:size-[1.875rem]"
     strokeWidth={3.5}
     aria-hidden
    />
   </button>
   <button
    type="button"
    onClick={scrollNext}
    className={cn(heroNavButtonClass, "right-2 sm:right-4 lg:right-6")}
    aria-label={t("hero.nextSlide")}
   >
    <HeroChevronRight
     className="size-[1.375rem] text-current md:size-[1.875rem]"
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
