import "./page.css";
import { StoreShowcase } from "@/components/stores/store-showcase";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.contact.title,
  description: dictionary.pages.contact.description,
 };
}

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
