import { ProductsCatalogShell } from "@/components/catalog/products-catalog-shell";
import { buildProductsMegaMenu } from "@/lib/i18n/build-navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale, getServerDictionary } from "@/lib/i18n/server";
import { isUrunlerCatalogIndexable } from "@/lib/seo/google-snippets";
import { buildCatalogWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildCatalogSeoMetadata } from "@/lib/seo/page-metadata-builders";
import { buildSeoMetadataOutput } from "@/lib/seo/metadata-output";
import {
 containerPremiumClass,
 pageContentOffsetClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import { getPublishedProducts } from "@/lib/queries/products";

export const revalidate = 0;

export async function generateMetadata({ searchParams }) {
 const params = await searchParams;
 const categorySlug = params?.kategori ?? null;
 const { dictionary, locale } = await getServerDictionary();
 const seo = buildCatalogSeoMetadata(categorySlug, locale);
 const catalogPath = categorySlug
  ? `/urunler?kategori=${categorySlug}`
  : "/urunler";

 return buildSeoMetadataOutput({
  metaTitle: seo.metaTitle,
  description: seo.description,
  path: catalogPath,
  keywords: dictionary.pages.products.keywords ?? dictionary.metadata.keywords,
  index: isUrunlerCatalogIndexable({ categorySlug }),
 });
}

export default async function UrunlerPage({ searchParams }) {
 const params = await searchParams;
 const categorySlug = params?.kategori ?? null;
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const menuGroups = await getCategoryGroupsForMenu(locale);
 const productsMegaMenu = buildProductsMegaMenu(dictionary, menuGroups);
 const activeGroup =
  productsMegaMenu.groups.find((group) => group.slug === categorySlug) ?? null;
 const products = categorySlug ? await getPublishedProducts(categorySlug) : [];
 const catalogWebPageJsonLd = buildCatalogWebPageJsonLd({ categorySlug, locale });

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogWebPageJsonLd) }}
   />
   <div className={cn(containerPremiumClass, pageContentOffsetClass, "pb-12 md:pb-28")}>
    <ProductsCatalogShell
     products={products}
     activeGroup={activeGroup}
     categorySlug={categorySlug}
    />
   </div>
  </>
 );
}
