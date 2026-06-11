"use client";

import { ProductCategoryRelated } from "@/components/product/product-category-related";
import { cn } from "@/lib/utils";

export function ProductDetailRight({
 product,
 categoryLabel,
 categoryProducts,
 className,
}) {
 return (
  <aside className={cn("flex flex-col gap-4 lg:self-start", className)}>

   {categoryLabel && categoryProducts.length > 0 ? (
    <ProductCategoryRelated
     products={categoryProducts}
     categoryLabel={categoryLabel}
    />
   ) : null}
  </aside>
 );
}
