import { SeoPageJsonLd } from "@/components/seo/seo-page-json-ld";
import {
 buildProductsItemListJsonLd,
 buildSiteNavigationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageSeoMetadata } from "@/lib/seo/pages";
import { getServerDictionary } from "@/lib/i18n/server";
import { getProductsForSeo } from "@/lib/queries/products-seo";
import { buildSeoMetadataOutput } from "@/lib/site-metadata";

export async function generateMetadata() {
 const { locale } = await getServerDictionary();
 const seo = buildPageSeoMetadata("home", locale);
 const openGraphLocale = locale === "en" ? "en_US" : "tr_TR";

 return buildSeoMetadataOutput({
  metaTitle: seo.metaTitle,
  description: seo.description,
  path: "/",
  index: true,
  openGraph: { locale: openGraphLocale },
 });
}

export default async function AnasayfaLayout({ children }) {
 const { locale } = await getServerDictionary();
 const seo = buildPageSeoMetadata("home", locale);
 const products = await getProductsForSeo();
 const productsJsonLd = buildProductsItemListJsonLd({ products, locale });
 const siteNavigationJsonLd = buildSiteNavigationJsonLd(locale);

 return (
  <>
   <SeoPageJsonLd pageKey="home" />
   <h1 className="sr-only">{seo.metaTitle}</h1>
   {seo?.description ? (
    <p className="sr-only">{seo.description}</p>
   ) : null}
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
   {children}
  </>
 );
}
