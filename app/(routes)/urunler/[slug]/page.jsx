import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/server";
import { buildNavigation, getProductCategoryGroupFromMenu } from "@/lib/i18n/build-navigation";
import {
 getCategoryRelatedProducts,
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

 return {
  title: product.name,
  description:
   product.description ??
   `${product.name} — ${dictionary.metadata.title}`,
 };
}

export default async function UrunDetayPage({ params }) {
 const { slug } = await params;
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const navigation = buildNavigation(dictionary);
 const product = await getProductBySlug(slug);

 if (!product) {
  notFound();
 }

 const categoryGroup = getProductCategoryGroupFromMenu(
  slug,
  navigation.productsMegaMenu
 );
 const categoryProducts = await getCategoryRelatedProducts(slug);

 return (
  <div className="page-content-offset pb-10 md:pb-14">
   <div className="container-premium">
    <ProductDetailView
     product={product}
     categoryLabel={categoryGroup?.label ?? null}
     categoryProducts={categoryProducts}
    />
   </div>
  </div>
 );
}
