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
  <section className="relative min-h-[360px] overflow-hidden sm:min-h-[400px] lg:min-h-[520px]">
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
   <div className="absolute inset-0 flex flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-8 lg:pt-[4%] lg:pb-[8%]">
    <div className="flex w-full max-w-md shrink-0 flex-col items-center gap-3 sm:max-w-xl sm:gap-4 lg:max-w-2xl lg:gap-5">
     <h2
      className={cn(
       "flex w-full flex-col items-center gap-1.5 sm:gap-2 lg:gap-3",
       visualHeroTitleShadowClass
      )}
     >
      <span
       className={cn(
        visualHeroTitleLineClass.lead,
        "block whitespace-nowrap text-[clamp(0.72rem,2.8vw,1.38rem)] tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.3em]"
       )}
      >
       {brandExperienceTitleLines[0]}
      </span>
      <span
       className={cn(
        visualHeroTitleLineClass.emphasis,
        "flex flex-col items-center leading-[1.02] lg:block lg:whitespace-nowrap"
       )}
      >
       <span className="max-lg:block lg:inline">{brandExperienceTitleLines[1]} </span>
       <span className="whitespace-nowrap max-lg:block lg:inline">
        {brandExperienceTitleLines[2]}
       </span>
      </span>
     </h2>
     <p className="text-sm leading-relaxed text-white/85 drop-shadow-[0_2px_10px_rgb(0_0_0/35%)] sm:text-base">
      {brandExperienceDescription}
     </p>
    </div>
    <div className="mt-auto flex w-full justify-center pt-6 sm:pt-8">
     <Link
      href="/hakkimizda"
      className="inline-flex h-11 shrink-0 scale-100 items-center justify-center rounded-full border border-white/35 bg-white/15 px-8 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md transition-[scale,background-color,border-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:border-white/50 hover:bg-white/22 active:scale-100 motion-reduce:duration-150"
     >
      {brandExperienceCta}
     </Link>
    </div>
   </div>
  </section>
 );
}
