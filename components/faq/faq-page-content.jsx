"use client";

import { FaqCategorySection } from "@/components/faq/faq-category-section";
import { FaqContactBar } from "@/components/faq/faq-contact-bar";
import { FaqIntro } from "@/components/faq/faq-intro";
import { useTranslations } from "@/contexts/locale-provider";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function FaqPageContent() {
 const { dictionary } = useTranslations();

 return (
  <div className={cn(containerPremiumClass, "pb-20 pt-10 md:pb-28 md:pt-14")}>
   <FaqIntro />
   <FaqContactBar />

   {dictionary.faq.categories.map((category) => (
    <FaqCategorySection key={category.id} category={category} />
   ))}
  </div>
 );
}
