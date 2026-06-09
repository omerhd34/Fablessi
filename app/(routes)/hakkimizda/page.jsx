import "./page.css";
import { AboutHero } from "@/components/about/about-hero";
import { AboutPageContent } from "@/components/about/about-page-content";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.about.title,
  description: dictionary.pages.about.description,
 };
}

export default function HakkimizdaPage() {
 return (
  <div className="bg-background">
   <AboutHero />
   <AboutPageContent />
  </div>
 );
}
