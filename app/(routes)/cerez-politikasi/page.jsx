import { LegalHero } from "@/components/legal/legal-hero";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("cookies");

export default function CerezPolitikasiPage() {
 return (
  <div className="bg-background">
   <LegalHero contentKey="cookies" />
   <LegalPageContent contentKey="cookies" />
  </div>
 );
}
