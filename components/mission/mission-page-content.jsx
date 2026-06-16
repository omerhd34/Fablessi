"use client";

import Image from "next/image";
import Link from "next/link";
import { DynamicReactIcon } from "@/components/ui/dynamic-react-icon";
import { useTranslations } from "@/contexts/locale-provider";
import { SupportAgent, ViewModule } from "@/lib/icons";
import {
 missionCtaClass,
 missionIntroClass,
 missionStatementClass,
 missionStatementsClass,
 missionValueClass,
 missionValueIconClass,
 missionVisualImageClass,
} from "@/lib/layout/page-styles";
import {
 containerPremiumClass,
 sectionPaddingSmClass,
} from "@/lib/layout/shared-styles";
import { MOBILE_LAYOUT_MAX } from "@/lib/layout/breakpoints";
import { cn } from "@/lib/utils";
import { formatMissionValueTitle } from "@/lib/i18n/format-display-text";

export function MissionPageContent() {
 const { dictionary, locale } = useTranslations();
 const { missionVision } = dictionary;

 return (
  <>
   <section
    className={cn(
     "mission-intro bg-background pb-12 pt-10 md:pb-14 md:pt-14",
     missionIntroClass
    )}
   >
    <div className={containerPremiumClass}>
     <p className="mx-auto max-w-3xl text-center font-body text-sm leading-relaxed text-charcoal/75 md:text-[0.95rem]">
      {missionVision.intro}
     </p>
    </div>
   </section>

   <section className={cn("mission-statements", sectionPaddingSmClass, missionStatementsClass)}>
    <div className={containerPremiumClass}>
     <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <article className={cn("mission-statement rounded-2xl px-7 py-9 md:px-9 md:py-10", missionStatementClass)}>
       <h2 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase">
        {missionVision.missionTitle}
       </h2>
       <p className="mt-6 font-body text-sm leading-[1.85] text-charcoal/78 md:text-[0.95rem]">
        {missionVision.missionText}
       </p>
      </article>

      <article className={cn("mission-statement rounded-2xl px-7 py-9 md:px-9 md:py-10", missionStatementClass)}>
       <h2 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase">
        {missionVision.visionTitle}
       </h2>
       <p className="mt-6 font-body text-sm leading-[1.85] text-charcoal/78 md:text-[0.95rem]">
        {missionVision.visionText}
       </p>
      </article>
     </div>
    </div>
   </section>

   <section
    className={cn("mission-visual", sectionPaddingSmClass)}
    aria-hidden
   >
    <div className={containerPremiumClass}>
     <div className={cn("relative aspect-video overflow-hidden rounded-2xl sm:aspect-21/9", missionVisualImageClass)}>
      <Image
       src="https://res.cloudinary.com/dbo6puh1c/image/upload/v1781205876/fablessi/velar-oturma/01.jpg"
       alt=""
       fill
       sizes={`(max-width: ${MOBILE_LAYOUT_MAX}) 100vw, ${MOBILE_LAYOUT_MAX}`}
       className="object-cover object-center"
      />
     </div>
    </div>
   </section>

   <section
    className={cn("mission-values", sectionPaddingSmClass)}
    aria-labelledby="mission-values-heading"
   >
    <div className={containerPremiumClass}>
     <h2
      id="mission-values-heading"
      className="text-center font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase"
     >
      {missionVision.valuesTitle}
     </h2>

     <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {missionVision.values.map((value) => (
       <article
        key={value.title}
        className={cn("mission-value rounded-2xl px-6 py-8 text-center", missionValueClass)}
       >
        <div className={cn("mx-auto", missionValueIconClass)} aria-hidden>
         <DynamicReactIcon
          name={value.icon}
          className="size-6 text-charcoal/70"
         />
        </div>
        <h3
         className={cn(
          "mt-5 font-display text-[0.72rem] tracking-[0.24em] text-charcoal",
          locale === "en" && "uppercase"
         )}
        >
         {formatMissionValueTitle(value.title, locale)}
        </h3>
        <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/72">
         {value.description}
        </p>
       </article>
      ))}
     </div>
    </div>
   </section>

   <section
    className="mission-commitments pb-16 md:pb-20"
    aria-labelledby="mission-commitments-heading"
   >
    <div className={containerPremiumClass}>
     <div className="mx-auto max-w-2xl text-center">
      <h2
       id="mission-commitments-heading"
       className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase"
      >
       {missionVision.commitmentsTitle}
      </h2>
      <ul className="mt-8 space-y-4 text-left md:text-center">
       {missionVision.commitments.map((item) => (
        <li
         key={item}
         className="font-body text-sm leading-relaxed text-charcoal/75 md:text-[0.95rem]"
        >
         {item}
        </li>
       ))}
      </ul>
     </div>
    </div>
   </section>

   <section className={cn(containerPremiumClass, "pb-20 md:pb-28")}>
    <div className={cn("mission-cta rounded-2xl px-6 py-10 text-center text-white md:px-10 md:py-12", missionCtaClass)}>
     <h2 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.28em] uppercase">
      {missionVision.ctaTitle}
     </h2>
     <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/82 md:text-[0.95rem]">
      {missionVision.ctaDescription}
     </p>
     <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
      <Link
       href="/urunler"
       className="inline-flex h-11 scale-100 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-charcoal transition-[scale,background-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:bg-white/92 motion-reduce:duration-150"
      >
       <ViewModule className="size-4.5 shrink-0" aria-hidden />
       {missionVision.ctaProducts}
      </Link>
      <Link
       href="/iletisim"
       className="inline-flex h-11 scale-100 items-center justify-center gap-2 rounded-full border border-white/35 px-8 text-sm font-semibold text-white transition-[scale,background-color,border-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:border-white/50 hover:bg-white/10 motion-reduce:duration-150"
      >
       <SupportAgent className="size-4.5 shrink-0" aria-hidden />
       {missionVision.ctaContact}
      </Link>
     </div>
    </div>
   </section>
  </>
 );
}
