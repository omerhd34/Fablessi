import "@/components/legal/legal-page.css";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("kvkk");

export default function KvkkPage() {
 return (
  <div className="bg-background">
   <LegalHero contentKey="kvkk" />
   <LegalPageContent contentKey="kvkk" />
  </div>
 );
}
