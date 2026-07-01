import {
 buildFeaturedSectionJsonLd,
 buildProductsItemListJsonLd,
 buildSiteNavigationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageSeoMetadata } from "@/lib/seo/page-metadata-builders";
import { getServerDictionary } from "@/lib/i18n/server";
import { brandFullName } from "@/lib/navigation";
import { buildSiteOpenGraph, siteNameMetadata } from "@/lib/site-metadata";
import { getProductsForSeo } from "@/lib/queries/products-seo";

export async function generateMetadata() {
 const { locale } = await getServerDictionary();
 const seo = buildPageSeoMetadata("home", locale);

 return {
  ...siteNameMetadata,
  title: seo.title,
  description: seo.description,
  openGraph: buildSiteOpenGraph({
   title: seo.openGraphTitle,
   description: seo.description,
   url: "/",
  }),
  robots: {
   index: true,
   follow: true,
  },
 };
}

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
