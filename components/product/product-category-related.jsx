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
 productDetailAccordionItemClass,
 productDetailAccordionTriggerClass,
 productRelatedItemClass,
 productRelatedItemThumbClass,
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
   className="w-full"
  >
   <AccordionItem value="related-panel" className={productDetailAccordionItemClass}>
    <AccordionTrigger className={productDetailAccordionTriggerClass}>
     {categoryLabel}
    </AccordionTrigger>
    <AccordionContent className="pb-5 [&_a]:no-underline">
     <div className="space-y-3">
      {products.map((product) => {
       const imageUrl = getPrimaryImageUrl(product);

       return (
        <Link
         key={product.id}
         href={`/urunler/${product.slug}`}
         className={cn(
          "group flex cursor-pointer items-center gap-3 rounded-2xl p-2.5 no-underline",
          productRelatedItemClass,
          "origin-center scale-100 transition-[scale,border-color,background-color,box-shadow] duration-2000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] motion-reduce:duration-150"
         )}
        >
         <div className={cn("relative size-16 shrink-0 overflow-hidden rounded-xl", productRelatedItemThumbClass)}>
          {imageUrl ? (
           <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt ?? product.name}
            fill
            sizes="64px"
            className="object-cover"
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
