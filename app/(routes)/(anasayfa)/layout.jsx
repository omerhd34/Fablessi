import {
 buildFeaturedSectionJsonLd,
 buildProductsItemListJsonLd,
 buildSiteNavigationJsonLd,
} from "@/lib/seo/json-ld";
import { getServerDictionary } from "@/lib/i18n/server";
import { brandFullName } from "@/lib/navigation";
import { siteNameMetadata } from "@/lib/site-metadata";
import { getProductsForSeo } from "@/lib/queries/products-seo";

export const metadata = {
 ...siteNameMetadata,
 robots: {
  index: true,
  follow: true,
 },
};

export default async function AnasayfaLayout({ children }) {
 const { locale } = await getServerDictionary();
 const products = await getProductsForSeo();
 const productsJsonLd = buildProductsItemListJsonLd({ products, locale });
 const siteNavigationJsonLd = buildSiteNavigationJsonLd(locale);
 const featuredSectionJsonLd = buildFeaturedSectionJsonLd(locale);

 return (
  <>
   <h1 className="sr-only">{brandFullName}</h1>
   {productsJsonLd ? (
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
    />
   ) : null}
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
