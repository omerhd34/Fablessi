import { getServerDictionary } from "@/lib/i18n/server";
import { getProductsForSeo } from "@/lib/queries/products-seo";
import { buildProductsItemListJsonLd } from "@/lib/seo/json-ld";

export default async function RoutesLayout({ children }) {
 const { locale } = await getServerDictionary();
 const products = await getProductsForSeo();
 const productsJsonLd = buildProductsItemListJsonLd({ products, locale });

 return (
  <>
   {productsJsonLd ? (
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
    />
   ) : null}
   {children}
  </>
 );
}
