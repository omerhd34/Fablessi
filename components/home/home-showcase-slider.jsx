"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight, HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { contactFloatBtnClass } from "@/lib/layout/header-styles";
import {
 containerPremiumClass,
 headingDisplayClass,
 sectionPaddingClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";
import {
 Carousel,
 CarouselContent,
 CarouselDots,
 CarouselItem,
 useCarousel,
} from "@/components/ui/carousel";

const slideClassName = "basis-full sm:basis-1/3 sm:pl-5";
const SHOWCASE_AUTOPLAY_MS = 6000;

const navButtonClassName = cn(
 contactFloatBtnClass,
 "hidden size-11 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 sm:size-12 lg:inline-flex [&_svg]:size-5 md:[&_svg]:size-[1.375rem] [&_svg]:[stroke-width:3.5]"
);

function useShowcaseAutoplay(api, enabled) {
 const autoplayTimerRef = useRef(null);
 const autoplayRemainingRef = useRef(SHOWCASE_AUTOPLAY_MS);
 const autoplayStartedAtRef = useRef(0);

 const clearAutoplayTimer = useCallback(() => {
  if (autoplayTimerRef.current !== null) {
   window.clearTimeout(autoplayTimerRef.current);
   autoplayTimerRef.current = null;
  }
 }, []);

 const scheduleAutoplay = useCallback(
  (delay = SHOWCASE_AUTOPLAY_MS) => {
   if (!api || !enabled) return;

   clearAutoplayTimer();
   autoplayRemainingRef.current = delay;
   autoplayStartedAtRef.current = Date.now();

   if (document.hidden) return;

   autoplayTimerRef.current = window.setTimeout(() => {
    api.scrollNext();
   }, delay);
  },
  [api, clearAutoplayTimer, enabled]
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
  if (!api || !enabled || autoplayTimerRef.current !== null) return;
  scheduleAutoplay(autoplayRemainingRef.current);
 }, [api, enabled, scheduleAutoplay]);

 useEffect(() => {
  if (!api || !enabled) return;

  const onSelect = () => scheduleAutoplay();
  const onPointerDown = () => clearAutoplayTimer();

  onSelect();
  api.on("select", onSelect);
  api.on("reInit", onSelect);
  api.on("pointerDown", onPointerDown);

  return () => {
   api.off("select", onSelect);
   api.off("reInit", onSelect);
   api.off("pointerDown", onPointerDown);
   clearAutoplayTimer();
  };
 }, [api, clearAutoplayTimer, enabled, scheduleAutoplay]);

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
}

function HomeShowcaseNav({ direction }) {
 const { scrollPrev, scrollNext, canScrollNext } = useCarousel();
 const isPrev = direction === "prev";
 const disabled = isPrev ? false : !canScrollNext;
 const Icon = isPrev ? HeroChevronLeft : HeroChevronRight;

 return (
  <button
   type="button"
   onClick={isPrev ? scrollPrev : scrollNext}
   disabled={disabled}
   className={navButtonClassName}
   aria-label={isPrev ? "Önceki slayt" : "Sonraki slayt"}
  >
   <Icon strokeWidth={3.5} aria-hidden />
  </button>
 );
}

function HomeShowcaseTrack({ children }) {
 return (
  <div className="mx-auto w-full max-w-site-shell px-4 sm:px-5 md:px-6 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-6 lg:px-8 xl:gap-8 xl:px-10">
   <HomeShowcaseNav direction="prev" />
   <div className="min-w-0">
    <CarouselContent className="sm:-ml-5">{children}</CarouselContent>
   </div>
   <HomeShowcaseNav direction="next" />
  </div>
 );
}

export function HomeShowcaseSlider({
 id,
 title,
 description,
 action,
 itemCount = 0,
 className,
 children,
}) {
 const [carouselApi, setCarouselApi] = useState(null);
 const [autoplayEnabled, setAutoplayEnabled] = useState(true);

 useEffect(() => {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateAutoplay = () => setAutoplayEnabled(!motionQuery.matches);

  updateAutoplay();
  motionQuery.addEventListener("change", updateAutoplay);

  return () => motionQuery.removeEventListener("change", updateAutoplay);
 }, []);

 useShowcaseAutoplay(carouselApi, autoplayEnabled && itemCount > 1);

 if (!itemCount) {
  return null;
 }

 return (
  <section id={id} className={cn(sectionPaddingClass, "bg-white", className)}>
   <div className={containerPremiumClass}>
    <div className="mb-10 text-center md:mb-14">
     <h2 className={cn(headingDisplayClass, "text-charcoal")}>{title}</h2>
     {description ? (
      <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
       {description}
      </p>
     ) : null}
     {action ? (
      <Link
       href={action.href}
       className="mt-4 inline-flex scale-100 origin-center items-center gap-1 text-sm font-semibold text-charcoal/70 transition-[scale,color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:text-charcoal motion-reduce:duration-150"
      >
       {action.label}
       <ChevronRight className="size-4 shrink-0" aria-hidden />
      </Link>
     ) : null}
    </div>
   </div>

   <Carousel
    setApi={setCarouselApi}
    opts={{
     align: "start",
     loop: true,
     duration: 28,
     containScroll: "trimSnaps",
     dragFree: false,
     slidesToScroll: 1,
    }}
    className="w-full"
    aria-label={title}
   >
    <HomeShowcaseTrack>{children}</HomeShowcaseTrack>
    <div className={containerPremiumClass}>
     <CarouselDots className="mt-8" />
    </div>
   </Carousel>
  </section>
 );
}

export function HomeShowcaseSlide({ children, className }) {
 return (
  <CarouselItem className={cn(slideClassName, className)}>
   {children}
  </CarouselItem>
 );
}
