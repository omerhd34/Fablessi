import { StoreShowcase } from "@/components/stores/store-showcase";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { storePageClass } from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

export const generateMetadata = createPageMetadata("contact", { index: true });

export default function IletisimPage() {
 return (
  <div className="bg-background">
   <section className={storePageClass}>
    <div className={containerPremiumClass}>
     <StoreShowcase />
    </div>
   </section>
  </div>
 );
}
