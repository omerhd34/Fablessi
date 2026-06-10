import { ProductsCatalogShell } from "@/components/catalog/products-catalog-shell";
import { buildProductsMegaMenu } from "@/lib/i18n/build-navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import { getLocale } from "@/lib/i18n/server";
import {
 getCollectionBySlug,
 getPublishedProducts,
} from "@/lib/queries/products";

export const revalidate = 60;

export const generateMetadata = createPageMetadata("products");

export default async function UrunlerPage({ searchParams }) {
 const params = await searchParams;
 const categorySlug = params?.kategori ?? null;
 const collectionSlug = params?.koleksiyon ?? null;
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const menuGroups = await getCategoryGroupsForMenu(locale);
 const productsMegaMenu = buildProductsMegaMenu(dictionary, menuGroups);
 const activeGroup =
  productsMegaMenu.groups.find((group) => group.slug === categorySlug) ?? null;
 const activeCollection = collectionSlug
  ? await getCollectionBySlug(collectionSlug)
  : null;
 const products = await getPublishedProducts(categorySlug, collectionSlug);

 return (
  <div className="container-premium page-content-offset pb-20 md:pb-28">
   <ProductsCatalogShell
    products={products}
    activeGroup={activeGroup}
    activeCollection={activeCollection}
    categorySlug={categorySlug}
    collectionSlug={collectionSlug}
   />
  </div>
 );
}
