"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { HeroSlideImage } from "@/components/home/hero-slide-image";
import { useTranslations } from "@/contexts/locale-provider";
import { buildHeroSlides } from "@/lib/i18n/hero-slides-data";
import { cn } from "@/lib/utils";

const HeroCarousel = dynamic(
 () =>
  import("@/components/home/hero-carousel").then((module) => module.HeroCarousel),
 { ssr: false }
);

function HeroStaticFallback({ slide }) {
 return (
  <section className="hero-carousel relative w-full">
   <div className="relative min-h-dvh w-full">
    <HeroSlideImage
     slide={slide}
     priority
     className={cn("object-cover", slide.imagePosition ?? "object-center")}
    />
   </div>
  </section>
 );
}

export function HeroSection() {
 const { dictionary } = useTranslations();
 const heroSlides = useMemo(
  () => buildHeroSlides(dictionary),
  [dictionary]
 );
 const [carouselReady, setCarouselReady] = useState(false);

 useEffect(() => {
  if (typeof window.requestIdleCallback === "function") {
   const id = window.requestIdleCallback(() => setCarouselReady(true), {
    timeout: 2500,
   });
   return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(() => setCarouselReady(true), 1500);
  return () => window.clearTimeout(id);
 }, []);

 if (!carouselReady) {
  return <HeroStaticFallback slide={heroSlides[0]} />;
 }

 return <HeroCarousel heroSlides={heroSlides} />;
}
