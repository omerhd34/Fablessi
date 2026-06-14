"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { getPrimaryImageUrl } from "@/lib/product-utils";
import {
 productRelatedItemClass,
 productRelatedItemThumbClass,
 productRelatedPanelClass,
 productRelatedPanelHeaderClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductCategoryRelated({ products, categoryLabel }) {
 const [open, setOpen] = useState(["related-panel"]);

 if (products.length === 0) return null;

 return (
  <Accordion
   type="multiple"
   value={open}
   onValueChange={setOpen}
   className={cn("flex shrink-0 flex-col overflow-hidden rounded-3xl", productRelatedPanelClass)}
  >
   <AccordionItem value="related-panel" className="border-b-0">
    <AccordionTrigger className={cn("shrink-0 cursor-pointer justify-center px-4 py-3.5 text-sm font-semibold text-charcoal hover:no-underline", productRelatedPanelHeaderClass)}>
     <span className="flex-1 text-center">{categoryLabel}</span>
    </AccordionTrigger>
    <AccordionContent className="p-3 [&_a]:no-underline">
     <div className="space-y-3">
      {products.map((product) => {
       const imageUrl = getPrimaryImageUrl(product);

       return (
        <Link
         key={product.id}
         href={`/urunler/${product.slug}`}
         className={cn("group flex cursor-pointer items-center gap-3 rounded-2xl p-2.5 no-underline", productRelatedItemClass)}
        >
         <div className={cn("relative size-16 shrink-0 overflow-hidden rounded-xl", productRelatedItemThumbClass)}>
          {imageUrl ? (
           <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt ?? product.name}
            fill
            sizes="64px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
           />
          ) : null}
         </div>
         <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-charcoal">{product.name}</p>
         </div>
        </Link>
       );
      })}
     </div>
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}
