"use client";

import { FaqCategorySection } from "@/components/faq/faq-category-section";
import { FaqContactBar } from "@/components/faq/faq-contact-bar";
import { FaqIntro } from "@/components/faq/faq-intro";
import { useTranslations } from "@/contexts/locale-provider";

export function FaqPageContent() {
 const { dictionary } = useTranslations();

 return (
  <div className="container-premium pb-20 pt-10 md:pb-28 md:pt-14">
   <FaqIntro />
   <FaqContactBar />

   {dictionary.faq.categories.map((category) => (
    <FaqCategorySection key={category.id} category={category} />
   ))}
  </div>
 );
}
