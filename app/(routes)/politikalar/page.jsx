import { LegalHero } from "@/components/legal/legal-hero";
import { LegalPoliciesContent } from "@/components/legal/legal-policies-content";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("policies", { index: false });

export default function PolitikalarPage() {
 return (
  <div className="bg-background">
   <LegalHero contentKey="policies" />
   <LegalPoliciesContent />
  </div>
 );
}
