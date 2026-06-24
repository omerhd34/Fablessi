import {
 buildFeaturedSectionJsonLd,
 buildSiteNavigationJsonLd,
 buildWebSiteJsonLd,
} from "@/lib/seo/json-ld";
import { getServerDictionary } from "@/lib/i18n/server";
import { brandFullName } from "@/lib/navigation";

export const metadata = {
 robots: {
  index: true,
  follow: true,
 },
 openGraph: {
  siteName: brandFullName,
 },
};

export default async function AnasayfaLayout({ children }) {
 const { locale } = await getServerDictionary();
 const webSiteJsonLd = buildWebSiteJsonLd();
 const siteNavigationJsonLd = buildSiteNavigationJsonLd(locale);
 const featuredSectionJsonLd = buildFeaturedSectionJsonLd(locale);

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
   />
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
