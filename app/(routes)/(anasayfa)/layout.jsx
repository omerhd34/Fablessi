import {
 buildFeaturedSectionJsonLd,
 buildSiteNavigationJsonLd,
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
 const siteNavigationJsonLd = buildSiteNavigationJsonLd(locale);
 const featuredSectionJsonLd = buildFeaturedSectionJsonLd(locale);

 return (
  <>
   <h1 className="sr-only">{brandFullName}</h1>
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
