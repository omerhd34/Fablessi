"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import {
 aboutContentBodyClass,
 aboutContentClosingClass,
 aboutVisualImageClass,
 visualHeroTitleLineClass,
 visualHeroTitleShadowClass,
} from "@/lib/layout/page-styles";
import {
 containerPremiumClass,
 sectionPaddingSmClass,
} from "@/lib/layout/shared-styles";
import { MOBILE_LAYOUT_MAX } from "@/lib/layout/breakpoints";
import { cn } from "@/lib/utils";

const ABOUT_VISUAL_IMAGES = {
 sm: "/about-visual/mobile.png",
 md: "/about-visual/tablet.png",
 lg: "/about-visual/laptop.png",
 xl: "/about-visual/genis-ekran.png",
};

export function AboutPageContent() {
 const { dictionary } = useTranslations();
 const { about } = dictionary;

 const visualAlt = about.visualTitleLines.join(" ");

 return (
  <>
   <section className={cn("about-visual", sectionPaddingSmClass)}>
    <div className={containerPremiumClass}>
     <div className={cn("relative aspect-video overflow-hidden rounded-2xl sm:aspect-21/9", aboutVisualImageClass)}>
      <picture className="absolute inset-0 block h-full w-full">
       <source media="(min-width: 96rem)" srcSet={ABOUT_VISUAL_IMAGES.xl} />
       <source media="(min-width: 64rem)" srcSet={ABOUT_VISUAL_IMAGES.lg} />
       <source media="(min-width: 48rem)" srcSet={ABOUT_VISUAL_IMAGES.md} />
       <Image
        src={ABOUT_VISUAL_IMAGES.sm}
        alt={visualAlt}
        fill
        sizes={`(max-width: ${MOBILE_LAYOUT_MAX}) 100vw, ${MOBILE_LAYOUT_MAX}`}
        className="object-cover object-center"
       />
      </picture>
      <div className="pointer-events-none absolute inset-x-0 top-[10%] px-5 text-center sm:top-[11%] sm:px-8 md:top-[12%] lg:top-[13%]">
       <h2
        className={cn(
         "mx-auto flex w-full max-w-[min(100%,40rem)] flex-col items-center gap-2 sm:max-w-[min(100%,46rem)] sm:gap-2.5 lg:max-w-[min(100%,52rem)] lg:gap-3",
         visualHeroTitleShadowClass
        )}
       >
        <span className={cn("block sm:whitespace-nowrap", visualHeroTitleLineClass.lead)}>
         {about.visualTitleLines[0]}
        </span>
        <span className={cn("block sm:whitespace-nowrap", visualHeroTitleLineClass.emphasis)}>
         {about.visualTitleLines[1]}
        </span>
       </h2>
      </div>
      <div className="absolute inset-x-0 bottom-[7%] flex justify-center px-6 sm:bottom-[8%] md:bottom-[9%]">
       <Link
        href="/urunler"
        className="inline-flex h-11 scale-100 items-center justify-center rounded-full border border-white/35 bg-white/15 px-8 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md transition-[scale,background-color,border-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:border-white/50 hover:bg-white/22 active:scale-100 motion-reduce:duration-150"
       >
        {about.visualCta}
       </Link>
      </div>
     </div>
    </div>
   </section>

   <section className="about-content pb-20 md:pb-28">
    <div className={containerPremiumClass}>
     <div className={cn("about-content__body mx-auto max-w-5xl", aboutContentBodyClass)}>
      <p className="about-content__greeting font-display text-[clamp(1.15rem,2.8vw,1.45rem)] font-semibold leading-snug tracking-tight text-charcoal">
       {about.greeting}
      </p>

      <div className="mt-8 space-y-6">
       {about.paragraphs.map((paragraph) => (
        <p
         key={paragraph}
         className="font-body text-sm leading-[1.9] text-charcoal/78 md:text-[0.95rem]"
        >
         {paragraph}
        </p>
       ))}
      </div>

      <p className={cn("about-content__closing mt-10 font-display text-[clamp(1rem,2.2vw,1.2rem)] font-medium tracking-tight text-charcoal", aboutContentClosingClass)}>
       {about.closing}
      </p>
     </div>
    </div>
   </section>
  </>
 );

}
