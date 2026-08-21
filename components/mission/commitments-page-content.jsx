"use client";

import { MissionCta } from "@/components/mission/mission-cta";
import { useTranslations } from "@/contexts/locale-provider";
import { CheckIcon } from "@/lib/icons";
import {
 missionCommitmentItemClass,
 missionStatementsClass,
} from "@/lib/layout/page-styles";
import {
 containerPremiumClass,
 sectionPaddingSmClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function CommitmentsPageContent() {
 const { dictionary } = useTranslations();
 const { missionVision } = dictionary;

 return (
  <section
   className={cn(
    "mission-commitments flex flex-1 flex-col",
    sectionPaddingSmClass,
    "pb-20 md:pb-28",
    missionStatementsClass
   )}
  >
   <div className={containerPremiumClass}>
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

    <MissionCta className="mt-10 md:mt-14" />
   </div>
  </section>
 );
}
