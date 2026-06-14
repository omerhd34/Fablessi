import { LegalHero } from "@/components/legal/legal-hero";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("privacy");

export default function GizlilikPolitikasiPage() {
 return (
  <div className="bg-background">
   <LegalHero contentKey="privacy" />
   <LegalPageContent contentKey="privacy" />
  </div>
 );
}
