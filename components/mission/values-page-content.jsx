"use client";

import { MissionCta } from "@/components/mission/mission-cta";
import { DynamicReactIcon } from "@/components/ui/dynamic-react-icon";
import { useTranslations } from "@/contexts/locale-provider";
import { formatMissionValueTitle } from "@/lib/i18n/format-display-text";
import {
 missionStatementsClass,
 missionValueClass,
 missionValueIconClass,
} from "@/lib/layout/page-styles";
import {
 containerPremiumClass,
 sectionPaddingSmClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function ValuesPageContent() {
 const { dictionary, locale } = useTranslations();
 const { missionVision } = dictionary;

 return (
  <section
   className={cn(
    "mission-values flex flex-1 flex-col",
    sectionPaddingSmClass,
    "pb-20 md:pb-28",
    missionStatementsClass
   )}
  >
   <div className={containerPremiumClass}>
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
       <h2
        className={cn(
         "mt-5 font-display text-[0.72rem] tracking-[0.24em] text-charcoal",
         locale === "en" && "uppercase"
        )}
       >
        {formatMissionValueTitle(value.title, locale)}
       </h2>
       <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/72">
        {value.description}
       </p>
      </article>
     ))}
    </div>

    <MissionCta className="mt-10 md:mt-14" />
   </div>
  </section>
 );
}
