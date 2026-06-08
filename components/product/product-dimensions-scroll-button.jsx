"use client";

import { Ruler } from "@/lib/icons";
import { getDimensionItems } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductDimensionsScrollButton({
 product,
 t,
 onClick,
 className,
}) {
 const hasDimensions = getDimensionItems(product).length > 0;

 if (!hasDimensions) return null;

 return (
  <button
   type="button"
   onClick={() => onClick?.()}
   className={cn(
    "flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-charcoal/10 bg-white px-4 py-3.5 text-left text-sm font-medium text-charcoal shadow-[0_1px_3px_rgb(0_0_0/4%)] transition hover:border-charcoal/18 hover:shadow-[0_4px_16px_rgb(0_0_0/6%)]",
    className
   )}
  >
   <Ruler className="size-5 shrink-0 text-charcoal/55" aria-hidden />
   <span>{t("product.viewDimensionsTable")}</span>
  </button>
 );
}
