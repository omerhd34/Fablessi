import "@/components/legal/legal-page.css";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.cookies.title,
  description: dictionary.pages.cookies.description,
 };
}

export default function CerezPolitikasiPage() {
 return (
  <div className="bg-background">
   <LegalHero contentKey="cookies" />
   <LegalPageContent contentKey="cookies" />
  </div>
 );
}
