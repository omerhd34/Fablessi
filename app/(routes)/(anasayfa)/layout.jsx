import {
 buildFeaturedSectionJsonLd,
 buildSiteNavigationJsonLd,
} from "@/lib/seo/json-ld";
import { getServerDictionary } from "@/lib/i18n/server";

export const metadata = {
 robots: {
  index: true,
  follow: true,
 },
};

export default async function AnasayfaLayout({ children }) {
 const { locale } = await getServerDictionary();
 const siteNavigationJsonLd = buildSiteNavigationJsonLd(locale);
 const featuredSectionJsonLd = buildFeaturedSectionJsonLd(locale);

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
   />
   {featuredSectionJsonLd ? (
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredSectionJsonLd) }}
    />
   ) : null}
   {children}
  </>
 );
}
