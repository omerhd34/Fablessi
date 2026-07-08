import { SeoPageJsonLd } from "@/components/seo/seo-page-json-ld";
import {
 buildFeaturedSectionJsonLd,
 buildProductsItemListJsonLd,
 buildSiteNavigationJsonLd,
} from "@/lib/seo/json-ld";
import { buildSeoMetadataOutput } from "@/lib/seo/metadata-output";
import { buildPageSeoMetadata } from "@/lib/seo/page-metadata-builders";
import { getServerDictionary } from "@/lib/i18n/server";
import { getProductsForSeo } from "@/lib/queries/products-seo";

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
 const featuredSectionJsonLd = buildFeaturedSectionJsonLd(locale);

 return (
  <>
   <SeoPageJsonLd pageKey="home" />
   <h1 className="sr-only">{seo.metaTitle}</h1>
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
