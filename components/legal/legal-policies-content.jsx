"use client";

import { useTranslations } from "@/contexts/locale-provider";
import { LegalSection } from "@/components/legal/legal-section";
import { containerPremiumClass } from "@/lib/layout/shared-styles";

const POLICY_BLOCKS = [
 { contentKey: "kvkk", anchor: "kvkk" },
 { contentKey: "privacy", anchor: "gizlilik" },
 { contentKey: "cookies", anchor: "cerez" },
];

export function LegalPoliciesContent() {
 const { dictionary } = useTranslations();

 return (
  <article className="legal-page pb-16 md:pb-20">
   <div className={containerPremiumClass}>
    <div className="legal-page__body w-full divide-y divide-charcoal/8">
     {POLICY_BLOCKS.map(({ contentKey, anchor }) => {
      const content = dictionary.legal[contentKey];

      return (
       <section
        key={contentKey}
        id={anchor}
        className="scroll-mt-[calc(var(--header-height-mobile)+1.5rem)] py-10 first:pt-2 last:pb-0 lg:scroll-mt-[calc(var(--header-height-desktop)+1.75rem)] md:py-12 md:first:pt-4"
        aria-labelledby={`legal-policy-${contentKey}-title`}
       >
        <h2
         id={`legal-policy-${contentKey}-title`}
         className="font-display text-[clamp(1.15rem,2.4vw,1.5rem)] font-semibold tracking-tight text-charcoal"
        >
         {content.pageTitle}
        </h2>

        {content.intro ? (
         <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-charcoal/75 md:text-base">
          {content.intro}
         </p>
        ) : null}

        <div className={content.intro ? "mt-8 md:mt-9" : "mt-6"}>
         {content.sections.map((section) => (
          <LegalSection
           key={section.id}
           section={section}
           contentKey={contentKey}
           level={3}
          />
         ))}
        </div>
       </section>
      );
     })}
    </div>
   </div>
  </article>
 );
}
