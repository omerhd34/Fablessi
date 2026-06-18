import { FavoritesView } from "@/components/favorites/favorites-view";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import {
 containerPremiumClass,
 pageContentOffsetClass,
} from "@/lib/layout/shared-styles";
import { getProductDisplayPrice } from "@/lib/product-utils";
import { getPublishedProducts } from "@/lib/queries/products";
import { cn } from "@/lib/utils";

export const generateMetadata = createPageMetadata("favorites", { index: false });

export default async function FavorilerPage() {
 const products = await getPublishedProducts();
 const productMetaBySlug = Object.fromEntries(
  products.map((product) => [
   product.slug,
   {
    name: product.name,
    displayPrice: getProductDisplayPrice(product),
    createdAt: product.createdAt,
   },
  ])
 );

 return (
  <div className={cn(containerPremiumClass, pageContentOffsetClass, "pb-20 md:pb-28")}>
   <FavoritesView productMetaBySlug={productMetaBySlug} />
  </div>
 );
}
