import { faqCategories } from "@/lib/faq";
import { FaqCategorySection } from "@/components/faq/faq-category-section";
import { FaqContactBar } from "@/components/faq/faq-contact-bar";
import { FaqIntro } from "@/components/faq/faq-intro";

export function FaqPageContent() {
 return (
  <div className="container-premium pb-20 pt-10 md:pb-28 md:pt-14">
   <FaqIntro />
   <FaqContactBar />

   {faqCategories.map((category) => (
    <FaqCategorySection key={category.id} category={category} />
   ))}
  </div>
 );
}
