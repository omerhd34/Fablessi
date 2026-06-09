import "@/components/legal/legal-page.css";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.privacy.title,
  description: dictionary.pages.privacy.description,
 };
}

export default function GizlilikPolitikasiPage() {
 return (
  <div className="bg-background">
   <LegalHero contentKey="privacy" />
   <LegalPageContent contentKey="privacy" />
  </div>
 );
}
