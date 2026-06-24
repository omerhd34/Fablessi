import { AboutHero } from "@/components/about/about-hero";
import { AboutPageContent } from "@/components/about/about-page-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("about", { index: true });

export default function HakkimizdaPage() {
 return (
  <div className="bg-background">
   <AboutHero />
   <AboutPageContent />
  </div>
 );
}
