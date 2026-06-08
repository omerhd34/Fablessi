import "./page.css";
import { MissionHero } from "@/components/mission/mission-hero";
import { MissionPageContent } from "@/components/mission/mission-page-content";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.missionVision.title,
  description: dictionary.pages.missionVision.description,
 };
}

export default function MisyonVizyonPage() {
 return (
  <div className="bg-background">
   <MissionHero />
   <MissionPageContent />
  </div>
 );
}
