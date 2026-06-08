import "./page.css";
import { FaqHero } from "@/components/faq/faq-hero";
import { FaqPageContent } from "@/components/faq/faq-page-content";

export const metadata = {
 title: "Sıkça Sorulan Sorular",
 description:
  "Alışveriş, teslimat, iade ve ödeme hakkında sıkça sorulan sorular ve yanıtları.",
};

export default function SssPage() {
 return (
  <div className="bg-background">
   <FaqHero />
   <FaqPageContent />
  </div>
 );
}
