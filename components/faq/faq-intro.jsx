"use client";

import { useTranslations } from "@/contexts/locale-provider";

export function FaqIntro() {
 const { t } = useTranslations();

 return (
  <p className="mx-auto max-w-3xl text-center font-body text-sm leading-relaxed text-charcoal/80 md:text-[0.95rem]">
   {t("faq.intro")}
  </p>
 );
}
