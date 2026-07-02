import { AboutHero } from "@/components/about/about-hero";
import { AboutPageContent } from "@/components/about/about-page-content";
import { SeoPageJsonLd } from "@/components/seo/seo-page-json-ld";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("about", { index: true });

export default function HakkimizdaPage() {
 return (
  <>
   <SeoPageJsonLd pageKey="about" />
   <div className="bg-background">
    <AboutHero />
    <AboutPageContent />
   </div>
  </>
 );
}
