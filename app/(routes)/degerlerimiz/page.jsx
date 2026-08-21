import { MissionHero } from "@/components/mission/mission-hero";
import { ValuesPageContent } from "@/components/mission/values-page-content";
import { SeoPageJsonLd } from "@/components/seo/seo-page-json-ld";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("values", { index: true });

export default function DegerlerimizPage() {
 return (
  <>
   <SeoPageJsonLd pageKey="values" />
   <div className="flex flex-1 flex-col bg-cream">
    <MissionHero titleKey="missionVision.valuesTitle" heroKey="values" />
    <ValuesPageContent />
   </div>
  </>
 );
}
