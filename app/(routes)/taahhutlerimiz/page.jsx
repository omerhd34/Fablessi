import { CommitmentsPageContent } from "@/components/mission/commitments-page-content";
import { MissionHero } from "@/components/mission/mission-hero";
import { SeoPageJsonLd } from "@/components/seo/seo-page-json-ld";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("commitments", { index: true });

export default function TaahhutlerimizPage() {
 return (
  <>
   <SeoPageJsonLd pageKey="commitments" />
   <div className="flex flex-1 flex-col bg-cream">
    <MissionHero titleKey="missionVision.commitmentsTitle" heroKey="commitments" />
    <CommitmentsPageContent />
   </div>
  </>
 );
}
