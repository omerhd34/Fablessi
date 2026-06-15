"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/locale-provider";
import {
 visualHeroTitleLineClass,
 visualHeroTitleShadowClass,
} from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

const BRAND_EXPERIENCE_IMAGES = {
 sm: "/brand-experience/mobile.png",
 md: "/brand-experience/tablet.png",
 lg: "/brand-experience/laptop.png",
 xl: "/brand-experience/genis-ekran.png",
};

export function BrandExperienceBanner() {
 const { dictionary } = useLocale();
 const { brandExperienceTitleLines, brandExperienceDescription, brandExperienceCta } =
  dictionary.home;
 const alt = brandExperienceTitleLines.join(" ");

 return (
  <section className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
   <picture className="absolute inset-0 block h-full w-full">
    <source media="(min-width: 96rem)" srcSet={BRAND_EXPERIENCE_IMAGES.xl} />
    <source media="(min-width: 64rem)" srcSet={BRAND_EXPERIENCE_IMAGES.lg} />
    <source media="(min-width: 48rem)" srcSet={BRAND_EXPERIENCE_IMAGES.md} />
    <Image
     src={BRAND_EXPERIENCE_IMAGES.sm}
     alt={alt}
     fill
     sizes="100vw"
     className="object-cover"
    />
   </picture>
   <div className="absolute inset-0 bg-black/45" />
   <div className="pointer-events-none absolute inset-x-0 top-[10%] px-5 text-center sm:top-[11%] sm:px-8 md:top-[12%] lg:top-[13%]">
    <h2
     className={cn(
      "mx-auto flex w-full max-w-[min(100%,40rem)] flex-col items-center gap-2 sm:max-w-[min(100%,46rem)] sm:gap-2.5 lg:max-w-[min(100%,52rem)] lg:gap-3",
      visualHeroTitleShadowClass
     )}
    >
     <span className={cn("block sm:whitespace-nowrap", visualHeroTitleLineClass.lead)}>
      {brandExperienceTitleLines[0]}
     </span>
     <span className={cn("block sm:whitespace-nowrap", visualHeroTitleLineClass.emphasis)}>
      {brandExperienceTitleLines[1]}
     </span>
    </h2>
   </div>
   <p className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto max-w-xl -translate-y-1/2 px-6 text-center text-sm leading-relaxed text-white/85 drop-shadow-[0_2px_10px_rgb(0_0_0/35%)] md:text-base">
    {brandExperienceDescription}
   </p>
   <div className="absolute inset-x-0 bottom-[7%] flex justify-center px-6 sm:bottom-[8%] md:bottom-[9%]">
    <Link
     href="/hakkimizda"
     className="inline-flex h-11 scale-100 items-center justify-center rounded-full border border-white/35 bg-white/15 px-8 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md transition-[scale,background-color,border-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:border-white/50 hover:bg-white/22 active:scale-100 motion-reduce:duration-150"
    >
     {brandExperienceCta}
    </Link>
   </div>
  </section>
 );
}
