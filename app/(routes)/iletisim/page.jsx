import "./page.css";
import { StoreShowcase } from "@/components/stores/store-showcase";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("contact");

export default function IletisimPage() {
 return (
  <div className="bg-background">
   <section className="store-page">
    <div className="container-premium">
     <StoreShowcase />
    </div>
   </section>
  </div>
 );
}
