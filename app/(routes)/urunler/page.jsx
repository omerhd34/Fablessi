import { ProductsCatalogShell } from "@/components/catalog/products-catalog-shell";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildProductsMegaMenu } from "@/lib/i18n/build-navigation";
import { getLocale } from "@/lib/i18n/server";
import {
 getCollectionBySlug,
 getPublishedProducts,
} from "@/lib/queries/products";

export const revalidate = 60;

export async function generateMetadata() {
 const locale = await getLocale();
 const dictionary = getDictionary(locale);

 return {
  title: dictionary.pages.products.title,
  description: dictionary.pages.products.description,
 };
}

export default async function UrunlerPage({ searchParams }) {
 const params = await searchParams;
 const categorySlug = params?.kategori ?? null;
 const collectionSlug = params?.koleksiyon ?? null;
 const dictionary = getDictionary(await getLocale());
 const productsMegaMenu = buildProductsMegaMenu(dictionary);
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
