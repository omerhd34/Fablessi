"use client";

import { ProductCategoryRelated } from "@/components/product/product-category-related";
import { cn } from "@/lib/utils";

export function ProductDetailRight({
 categoryLabel,
 categoryProducts,
 className,
}) {
 if (!categoryLabel || categoryProducts.length === 0) {
  return null;
 }

 return (
  <aside className={cn("flex flex-col gap-4 lg:self-start", className)}>
   <ProductCategoryRelated
    products={categoryProducts}
    categoryLabel={categoryLabel}
   />
  </aside>
 );
}
