import { MissionHero } from "@/components/mission/mission-hero";
import { MissionPageContent } from "@/components/mission/mission-page-content";
import { SeoPageJsonLd } from "@/components/seo/seo-page-json-ld";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("missionVision", { index: true });

export default function MisyonVizyonPage() {
 return (
  <>
   <SeoPageJsonLd pageKey="missionVision" />
   <div className="flex flex-1 flex-col bg-cream">
    <MissionHero />
    <MissionPageContent />
   </div>
  </>
 );
}
