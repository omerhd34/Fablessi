"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { visualHeroTitleShadowClass } from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

const ABOUT_HERO_IMAGES = {
 sm: "/about-visual/mobile.png",
 sm2x: "/about-visual/mobile-2x.png",
 md: "/about-visual/tablet.png",
 lg: "/about-visual/laptop.png",
 xl: "/about-visual/genis-ekran.png",
 xl2x: "/about-visual/genis-ekran-2x.png",
};

function getSiteHeaderHeight() {
 const header = document.querySelector(".site-header");
 if (!header) return 0;
 return Math.ceil(header.getBoundingClientRect().height);
}

export function AboutHero() {
 const { dictionary, t } = useTranslations();
 const { about } = dictionary;
 const [headerOffset, setHeaderOffset] = useState(0);

 useEffect(() => {
  const update = () => setHeaderOffset(getSiteHeaderHeight());

  update();

  const header = document.querySelector(".site-header");
  const observer = header ? new ResizeObserver(update) : null;
  observer?.observe(header);

  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, { passive: true });

  return () => {
   observer?.disconnect();
   window.removeEventListener("resize", update);
   window.removeEventListener("scroll", update);
  };
 }, []);

 return (
  <section
   className="about-hero header-logo-light-zone relative mt-0 w-full"
   style={{ "--about-hero-header-offset": `${headerOffset}px` }}
  >
   <div className="relative min-h-[min(42vh,400px)] w-full sm:min-h-[min(48vh,480px)] md:min-h-[min(52vh,560px)] lg:min-h-[min(48vh,520px)]">
    <picture className="absolute inset-0 block h-full w-full">
     <source
      media="(min-width: 96rem) and (min-resolution: 2dppx)"
      srcSet={ABOUT_HERO_IMAGES.xl2x}
     />
     <source media="(min-width: 96rem)" srcSet={ABOUT_HERO_IMAGES.xl} />
     <source media="(min-width: 64rem)" srcSet={ABOUT_HERO_IMAGES.lg} />
     <source media="(min-width: 48rem)" srcSet={ABOUT_HERO_IMAGES.md} />
     <source
      media="(max-width: 47.99rem) and (min-resolution: 2dppx)"
      srcSet={ABOUT_HERO_IMAGES.sm2x}
     />
     <Image
      src={ABOUT_HERO_IMAGES.sm}
      alt={about.visualTitleLines.join(" ")}
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
     />
    </picture>
    <div className="absolute inset-0 bg-black/30" aria-hidden />

    <div
     className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-6 text-center text-white sm:pb-10"
     style={{ paddingTop: "var(--about-hero-header-offset, 0px)" }}
    >
     <h1
      className={cn(
       "font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold tracking-tight",
       visualHeroTitleShadowClass
      )}
     >
      {t("about.pageTitle")}
     </h1>
    </div>
   </div>
  </section>
 );
}
