"use client";

import { useEffect, useState } from "react";
import { PageHeroPicture } from "@/components/ui/page-hero-picture";
import { useTranslations } from "@/contexts/locale-provider";
import { resolvePageHeroImage } from "@/lib/content/page-hero-images";
import { visualHeroTitleShadowClass } from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

function getSiteHeaderHeight() {
 const header = document.querySelector(".site-header");
 if (!header) return 0;
 return Math.ceil(header.getBoundingClientRect().height);
}

export function MissionHero() {
 const { dictionary, t } = useTranslations();
 const heroAlt = t("missionVision.heroImageAlt");
 const [headerOffset, setHeaderOffset] = useState(0);
 const heroImage = resolvePageHeroImage("missionVision", dictionary.missionVision);

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
    <PageHeroPicture src={heroImage} alt={heroAlt} />
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
