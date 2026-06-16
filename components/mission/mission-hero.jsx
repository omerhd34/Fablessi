"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { visualHeroTitleShadowClass } from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

const MISSION_HERO_IMAGES = {
 sm: "/mission-hero/mobile.jpeg",
 md: "/mission-hero/tablet.jpeg",
 lg: "/mission-hero/laptop.jpeg",
 xl: "/mission-hero/genis-ekran.jpeg",
};

function getSiteHeaderHeight() {
 const header = document.querySelector(".site-header");
 if (!header) return 0;
 return Math.ceil(header.getBoundingClientRect().height);
}

export function MissionHero() {
 const { t } = useTranslations();
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
   className="mission-hero relative mt-0 w-full"
   style={{ "--mission-hero-header-offset": `${headerOffset}px` }}
  >
   <div className="relative min-h-[min(42vh,400px)] w-full sm:min-h-[min(48vh,480px)] md:min-h-[min(52vh,560px)] lg:min-h-[min(48vh,520px)]">
    <picture className="absolute inset-0 block h-full w-full">
     <source media="(min-width: 96rem)" srcSet={MISSION_HERO_IMAGES.xl} />
     <source media="(min-width: 64rem)" srcSet={MISSION_HERO_IMAGES.lg} />
     <source media="(min-width: 48rem)" srcSet={MISSION_HERO_IMAGES.md} />
     <Image
      src={MISSION_HERO_IMAGES.sm}
      alt={t("missionVision.heroImageAlt")}
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
     />
    </picture>
    <div className="absolute inset-0 bg-black/30" aria-hidden />

    <div
     className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-6 text-center text-white sm:pb-10"
     style={{ paddingTop: "var(--mission-hero-header-offset, 0px)" }}
    >
     <h1
      className={cn(
       "text-2xl font-semibold tracking-tight md:text-[2rem] lg:text-[2.25rem]",
       visualHeroTitleShadowClass
      )}
     >
      {t("missionVision.pageTitle")}
     </h1>
    </div>
   </div>
  </section>
 );
}
