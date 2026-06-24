import { FaqHero } from "@/components/faq/faq-hero";
import { FaqPageContent } from "@/components/faq/faq-page-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("faq", { index: true });

export default function SssPage() {
 return (
  <div className="bg-background">
   <FaqHero />
   <FaqPageContent />
  </div>
 );
}
