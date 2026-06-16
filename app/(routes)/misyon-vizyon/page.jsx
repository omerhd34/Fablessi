import { MissionHero } from "@/components/mission/mission-hero";
import { MissionPageContent } from "@/components/mission/mission-page-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("missionVision");

export default function MisyonVizyonPage() {
 return (
  <div className="bg-background">
   <MissionHero />
   <MissionPageContent />
  </div>
 );
}
