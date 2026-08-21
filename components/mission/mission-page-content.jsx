"use client";

import { MissionCta } from "@/components/mission/mission-cta";
import { useTranslations } from "@/contexts/locale-provider";
import {
 missionStatementClass,
 missionStatementsClass,
} from "@/lib/layout/page-styles";
import {
 containerPremiumClass,
 sectionPaddingSmClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function MissionPageContent() {
 const { dictionary } = useTranslations();
 const { missionVision } = dictionary;

 return (
  <section
   className={cn(
    "mission-statements flex flex-1 flex-col",
    sectionPaddingSmClass,
    "pb-20 md:pb-28",
    missionStatementsClass
   )}
  >
   <div className={containerPremiumClass}>
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8" data-nosnippet>
     <article
      className={cn(
       "mission-statement rounded-2xl px-7 py-9 md:px-9 md:py-10",
       missionStatementClass
      )}
     >
      <h2 className="font-display text-[0.72rem] font-semibold tracking-[0.32em] text-charcoal/55 uppercase">
       {missionVision.missionTitle}
      </h2>
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
      <h2 className="font-display text-[0.72rem] font-semibold tracking-[0.32em] text-charcoal/55 uppercase">
       {missionVision.visionTitle}
      </h2>
      <p className="mt-6 font-body text-sm leading-[1.85] text-charcoal/78 md:text-[0.95rem]">
       {missionVision.visionText}
      </p>
     </article>
    </div>

    <MissionCta className="mt-10 md:mt-14" />
   </div>
  </section>
 );
}
