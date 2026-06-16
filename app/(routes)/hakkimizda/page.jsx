import { AboutHero } from "@/components/about/about-hero";
import { AboutPageContent } from "@/components/about/about-page-content";
import { MissionPageContent } from "@/components/mission/mission-page-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("about");

export default function HakkimizdaPage() {
 return (
  <div className="bg-background">
   <AboutHero />
   <AboutPageContent />
   <MissionPageContent />
  </div>
 );
}
