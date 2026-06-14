"use client";

import { useTranslations } from "@/contexts/locale-provider";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function LegalHero({ contentKey }) {
 const { t } = useTranslations();

 return (
  <section className="pt-[calc(var(--header-height-mobile)+2.5rem)] pb-4 sm:pt-[calc(var(--header-height-mobile-sm)+3rem)] lg:pt-[calc(var(--header-height-desktop)+3.25rem)]">
   <div className={cn(containerPremiumClass, "text-center")}>
    <p className="text-[0.68rem] font-semibold tracking-[0.38em] text-charcoal/50 uppercase">
     {t(`legal.${contentKey}.heroEyebrow`)}
    </p>
    <h1 className="mt-3 font-display text-[clamp(1.65rem,4vw,2.5rem)] font-semibold tracking-tight text-charcoal">
     {t(`legal.${contentKey}.pageTitle`)}
    </h1>
    <p className="mt-4 font-body text-[0.95rem] text-charcoal/55 md:text-base">
     {t("legal.shared.lastUpdatedLabel")}: {t(`legal.${contentKey}.lastUpdated`)}
    </p>
   </div>
  </section>
 );
}
