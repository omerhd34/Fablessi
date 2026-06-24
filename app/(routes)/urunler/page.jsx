import { ProductsCatalogShell } from "@/components/catalog/products-catalog-shell";
import { buildProductsMegaMenu } from "@/lib/i18n/build-navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { getLocale, getServerDictionary } from "@/lib/i18n/server";
import {
 buildUrunlerCatalogHref,
 getGoogleProductsDescription,
 getGoogleSitelinkByHref,
 isUrunlerCatalogIndexable,
} from "@/lib/seo/google-snippets";
import {
 containerPremiumClass,
 pageContentOffsetClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import {
 getCollectionBySlug,
 getPublishedProducts,
} from "@/lib/queries/products";

export const revalidate = 0;

function buildCollectionPageTitle(collectionName, locale) {
 if (locale === "en") return `${collectionName} Collection`;
 return `${collectionName} Koleksiyonu`;
}

export async function generateMetadata({ searchParams }) {
 const params = await searchParams;
 const categorySlug = params?.kategori ?? null;
 const collectionSlug = params?.koleksiyon ?? null;
 const collection = collectionSlug ? await getCollectionBySlug(collectionSlug) : null;
 const catalogHref = buildUrunlerCatalogHref(categorySlug, collectionSlug);
 const sitelink = getGoogleSitelinkByHref(catalogHref);
 const { dictionary, locale } = await getServerDictionary();
 const page = dictionary.pages.products;

 let title = sitelink?.name ?? page.title;
 let description =
  sitelink?.description ??
  getGoogleProductsDescription(categorySlug, locale) ??
  page.description;

 if (collection) {
  const collectionName =
   getLocalizedCollectionName(collection, dictionary) ?? collection.name;

  title = buildCollectionPageTitle(collectionName, locale);
  description =
   collection.description?.trim() ||
   `${collectionName} — ${page.layoutDescription ?? page.description}`;
 }

 return {
  title,
  description,
  keywords: page.keywords ?? dictionary.metadata.keywords,
  robots: {
   index: isUrunlerCatalogIndexable({ categorySlug, collectionSlug, collection }),
   follow: true,
  },
 };
}

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
 const products =
  categorySlug || collectionSlug
   ? await getPublishedProducts(categorySlug, collectionSlug)
   : [];

 return (
  <div className={cn(containerPremiumClass, pageContentOffsetClass, "pb-20 md:pb-28")}>
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
