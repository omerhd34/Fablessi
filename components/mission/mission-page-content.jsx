"use client";

import Link from "next/link";
import { DynamicReactIcon } from "@/components/ui/dynamic-react-icon";
import { useTranslations } from "@/contexts/locale-provider";
import { CheckIcon, SupportAgent, ViewModule } from "@/lib/icons";
import { brandFullNameUppercase } from "@/lib/navigation";
import {
 brandEyebrowClass,
 missionCommitmentItemClass,
 missionCtaClass,
 missionSectionHeaderClass,
 missionStatementClass,
 missionStatementsClass,
 missionValueClass,
 missionValueIconClass,
 pageSectionIntroClass,
 pageSectionTitleClass,
} from "@/lib/layout/page-styles";
import {
 containerPremiumClass,
 sectionPaddingSmClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";
import { formatMissionValueTitle } from "@/lib/i18n/format-display-text";

function MissionSectionHeader({ title, intro, headingId }) {
 return (
  <div className={missionSectionHeaderClass}>
   <p className={brandEyebrowClass}>{brandFullNameUppercase}</p>
   <h2 id={headingId} className={cn("mt-3", pageSectionTitleClass)}>
    {title}
   </h2>
   {intro ? <p className={pageSectionIntroClass}>{intro}</p> : null}
  </div>
 );
}

export function MissionPageContent() {
 const { dictionary, locale } = useTranslations();
 const { missionVision } = dictionary;

 return (
  <>
   <section
    className={cn("mission-statements", sectionPaddingSmClass, missionStatementsClass)}
   >
    <div className={containerPremiumClass}>
     {missionVision.intro ? (
      <p className="mx-auto mb-10 max-w-3xl text-center font-body text-sm leading-relaxed text-charcoal/75 md:mb-12 md:text-[0.95rem]">
       {missionVision.intro}
      </p>
     ) : null}

     <div className="grid gap-6 lg:grid-cols-2 lg:gap-8" data-nosnippet>
      <article
       className={cn(
        "mission-statement rounded-2xl px-7 py-9 md:px-9 md:py-10",
        missionStatementClass
       )}
      >
       <h3 className="font-display text-[0.72rem] font-semibold tracking-[0.32em] text-charcoal/55 uppercase">
        {missionVision.missionTitle}
       </h3>
       <p className="mt-6 font-body text-sm leading-[1.85] text-charcoal/78 md:text-[0.95rem]">
        {missionVision.missionText}
       </p>
      </article>

      <article
       className={cn(
        "mission-statement rounded-2xl px-7 py-9 md:px-9 md:py-10",
        missionStatementClass
       )}
      >
       <h3 className="font-display text-[0.72rem] font-semibold tracking-[0.32em] text-charcoal/55 uppercase">
        {missionVision.visionTitle}
       </h3>
       <p className="mt-6 font-body text-sm leading-[1.85] text-charcoal/78 md:text-[0.95rem]">
        {missionVision.visionText}
       </p>
      </article>
     </div>
    </div>
   </section>

   <section
    className={cn("mission-values border-t border-charcoal/8 bg-cream/35", sectionPaddingSmClass)}
    aria-labelledby="mission-values-heading"
   >
    <div className={containerPremiumClass}>
     <MissionSectionHeader
      title={missionVision.valuesTitle}
      headingId="mission-values-heading"
     />

     <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {missionVision.values.map((value) => (
       <article
        key={value.title}
        className={cn("mission-value rounded-2xl px-6 py-8 text-center", missionValueClass)}
       >
        <div className={cn("mx-auto", missionValueIconClass)} aria-hidden>
         <DynamicReactIcon
          name={value.icon}
          className="size-6 text-charcoal/70 transition-colors duration-2000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mission-value:text-charcoal motion-reduce:duration-150"
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
    className={cn("mission-commitments border-t border-charcoal/8", sectionPaddingSmClass)}
    aria-labelledby="mission-commitments-heading"
   >
    <div className={containerPremiumClass}>
     <MissionSectionHeader
      title={missionVision.commitmentsTitle}
      headingId="mission-commitments-heading"
     />

     <ul className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
      {missionVision.commitments.map((item) => (
       <li key={item} className={missionCommitmentItemClass}>
        <span
         className="grid size-7 shrink-0 place-items-center rounded-full border border-charcoal/10 bg-cream"
         aria-hidden
        >
         <CheckIcon className="size-4 text-charcoal/70" />
        </span>
        <span className="font-body text-sm leading-relaxed text-charcoal/78 md:text-[0.95rem]">
         {item}
        </span>
       </li>
      ))}
     </ul>
    </div>
   </section>

   <section className={cn(containerPremiumClass, "pb-20 pt-10 md:pb-28 md:pt-14")}>
    <div
     className={cn(
      "mission-cta rounded-2xl px-6 py-10 text-center text-white md:px-10 md:py-12",
      missionCtaClass
     )}
    >
     <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-white/55">
      {brandFullNameUppercase}
     </p>
     <h2 className="mt-3 font-display text-[clamp(1.15rem,2.5vw,1.45rem)] font-semibold tracking-[0.12em] uppercase">
      {missionVision.ctaTitle}
     </h2>
     <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/82 md:text-[0.95rem]">
      {missionVision.ctaDescription}
     </p>
     <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
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
