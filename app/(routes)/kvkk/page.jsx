import "@/components/legal/legal-page.css";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.kvkk.title,
  description: dictionary.pages.kvkk.description,
 };
}

export default function KvkkPage() {
 return (
  <div className="bg-background">
   <LegalHero contentKey="kvkk" />
   <LegalPageContent contentKey="kvkk" />
  </div>
 );
}
