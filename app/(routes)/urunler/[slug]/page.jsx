import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/server";
import {
 containerPremiumClass,
 pageContentOffsetClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";
import {
 trProductSeoDescriptionSuffix,
 enProductSeoDescriptionSuffix,
} from "@/lib/seo/local";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import { buildNavigation, getProductCategoryGroupFromMenu } from "@/lib/i18n/build-navigation";
import {
 getCategoryRelatedProducts,
 getCollectionRelatedProducts,
 getProductBySlug,
} from "@/lib/queries/products";

export const revalidate = 60;

export async function generateMetadata({ params }) {
 const { slug } = await params;
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const product = await getProductBySlug(slug);

 if (!product) {
  return { title: dictionary.product.notFound ?? "Product Not Found" };
 }

 const seoSuffix =
  locale === "en" ? enProductSeoDescriptionSuffix : trProductSeoDescriptionSuffix;

 return {
  title: product.name,
  description:
   product.description ??
   `${product.name} — ${seoSuffix}`,
  robots: {
   index: false,
   follow: true,
  },
 };
}

export default async function UrunDetayPage({ params }) {
 const { slug } = await params;
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const menuGroups = await getCategoryGroupsForMenu(locale);
 const navigation = buildNavigation(dictionary, menuGroups);
 const product = await getProductBySlug(slug);

 if (!product) {
  notFound();
 }

 const categoryGroup = getProductCategoryGroupFromMenu(
  slug,
  navigation.productsMegaMenu
 );
 const categoryProducts = await getCategoryRelatedProducts(slug);
 const collectionProducts = await getCollectionRelatedProducts(slug);

 return (
  <div className={cn(pageContentOffsetClass, "pb-10 md:pb-14")}>
   <div className={containerPremiumClass}>
    <ProductDetailView
     product={product}
     categoryLabel={categoryGroup?.label ?? null}
     categoryHref={categoryGroup?.href ?? null}
     categoryProducts={categoryProducts}
     collectionLabel={product.collection?.name ?? null}
     collectionProducts={collectionProducts}
    />
   </div>
  </div>
 );
}
