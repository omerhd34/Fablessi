"use client";

import { useEffect, useState } from "react";
import { PageHeroPicture } from "@/components/ui/page-hero-picture";
import { useTranslations } from "@/contexts/locale-provider";
import { resolvePageHeroImages } from "@/lib/content/page-hero-images";
import { cn } from "@/lib/utils";

function getSiteHeaderHeight() {
 const header = document.querySelector(".site-header");
 if (!header) return 0;
 return Math.ceil(header.getBoundingClientRect().height);
}

export function FaqHero() {
 const { dictionary, t } = useTranslations();
 const faqCategoryTabs = Object.entries(dictionary.faq.tabs).map(
  ([id, label]) => ({ id, label })
 );
 const [headerOffset, setHeaderOffset] = useState(0);
 const heroImages = resolvePageHeroImages("faq", dictionary.faq);

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

 const scrollToCategory = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
 };

 return (
  <section
   className="faq-hero relative mt-0 w-full"
   style={{ "--faq-hero-header-offset": `${headerOffset}px` }}
  >
   <div className="relative min-h-[min(42vh,400px)] w-full sm:min-h-[min(48vh,480px)] md:min-h-[min(52vh,560px)] lg:min-h-[min(48vh,520px)]">
    <PageHeroPicture images={heroImages} alt="" />
    <div className="absolute inset-0 bg-black/30" aria-hidden />

    <div
     className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-6 text-center text-white sm:pb-10"
     style={{ paddingTop: "var(--faq-hero-header-offset, 0px)" }}
    >
     <h1 className="text-2xl font-semibold tracking-tight md:text-[2rem] lg:text-[2.25rem]">
      {t("faq.pageTitle")}
     </h1>

     <nav
      className="mx-auto mt-5 flex w-full flex-nowrap items-center justify-center gap-x-2 sm:mt-8 sm:gap-x-4 md:gap-x-8"
      aria-label={t("faq.categoriesAria")}
     >
      {faqCategoryTabs.map((tab) => (
       <button
        key={tab.id}
        type="button"
        onClick={() => scrollToCategory(tab.id)}
        className={cn(
         "scale-100 cursor-pointer rounded-full border border-white/35 bg-white/20 px-4 py-2 font-body text-xs font-medium text-white backdrop-blur-sm transition-[scale,background-color,border-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:border-white/45 hover:bg-white/30 md:px-5 motion-reduce:duration-150"
        )}
       >
        {tab.label}
       </button>
      ))}
     </nav>
    </div>
   </div>
  </section>
 );
}
