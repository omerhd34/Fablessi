"use client";

import { ProductCategoryRelated } from "@/components/product/product-category-related";
import { cn } from "@/lib/utils";

export function ProductDetailRight({
 categoryLabel,
 categoryProducts,
 collectionLabel,
 collectionProducts,
 className,
}) {
 const hasCategoryPanel = categoryLabel && categoryProducts.length > 0;
 const hasCollectionPanel = collectionLabel && collectionProducts.length > 0;

 if (!hasCategoryPanel && !hasCollectionPanel) {
  return null;
 }

 return (
  <aside className={cn("flex flex-col gap-4 lg:self-start", className)}>
   {hasCategoryPanel ? (
    <ProductCategoryRelated
     products={categoryProducts}
     categoryLabel={categoryLabel}
    />
   ) : null}
   {hasCollectionPanel ? (
    <ProductCategoryRelated
     products={collectionProducts}
     categoryLabel={collectionLabel}
    />
   ) : null}
  </aside>
 );
}
