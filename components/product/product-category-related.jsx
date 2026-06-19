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
import { useLocale, useTranslations } from "@/contexts/locale-provider";
import { getCategoryLabelForProduct } from "@/lib/product-category";
import { getPrimaryImageUrl, getProductCardBottomLabel } from "@/lib/product-utils";
import {
 productDetailAccordionItemClass,
 productDetailAccordionTriggerClass,
 productRelatedItemClass,
 productRelatedItemThumbClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductCategoryRelated({ products, categoryLabel, variant = "category" }) {
 const { locale } = useLocale();
 const { dictionary } = useTranslations();
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
       const productLabel =
        variant === "collection"
         ? getCategoryLabelForProduct(product, dictionary) ??
         getProductCardBottomLabel(product, locale)
         : getProductCardBottomLabel(product, locale);

       return (
        <Link
         key={product.id}
         href={`/urunler/${product.slug}`}
         className={cn(
          "group flex cursor-pointer items-center gap-3 rounded-2xl p-2.5 no-underline transition-[border-color,background-color,box-shadow] duration-200",
          productRelatedItemClass
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
          <p className="truncate text-sm font-semibold text-charcoal">
           {productLabel}
          </p>
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
