import { buildSiteNavigationJsonLd } from "@/lib/seo/json-ld";
import { getServerDictionary } from "@/lib/i18n/server";

export const metadata = {
 robots: {
  index: true,
  follow: true,
 },
};

export default async function AnasayfaLayout({ children }) {
 const { dictionary } = await getServerDictionary();
 const siteNavigationJsonLd = buildSiteNavigationJsonLd(dictionary);

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
   />
   {children}
  </>
 );
}
