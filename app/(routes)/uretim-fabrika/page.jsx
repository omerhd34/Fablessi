import "./page.css";
import { ProductionHero } from "@/components/production/production-hero";
import { ProductionPageContent } from "@/components/production/production-page-content";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.production.title,
  description: dictionary.pages.production.description,
 };
}

export default function UretimFabrikaPage() {
 return (
  <div className="bg-background">
   <ProductionHero />
   <ProductionPageContent />
  </div>
 );
}
