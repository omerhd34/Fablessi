"use client";

import { useState } from "react";
import {
 ProductsCategoryFilter,
 ProductsColorFilter,
} from "@/components/catalog/products-filter-content";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function FilterSection({ title, defaultOpen = true, children }) {
 const [open, setOpen] = useState(defaultOpen);

 return (
  <div className="border-b border-charcoal/10 py-4 first:pt-0 last:border-b-0">
   <button
    type="button"
    onClick={() => setOpen((value) => !value)}
    className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
   >
    <span className="text-sm font-semibold text-charcoal">{title}</span>
    <ChevronDownIcon
     className={cn(
      "size-4 shrink-0 text-charcoal/40 transition-transform duration-200",
      open && "rotate-180"
     )}
    />
   </button>
   {open ? <div className="mt-4">{children}</div> : null}
  </div>
 );
}

export function ProductsFiltersSidebar({
 categorySlug,
 selectedColor,
 onColorChange,
 availableColors,
 className,
}) {
 return (
  <aside className={cn("shrink-0 lg:w-56 xl:w-60", className)}>
   <FilterSection title="Kategori" defaultOpen>
    <ProductsCategoryFilter categorySlug={categorySlug} />
   </FilterSection>

   {availableColors.length > 0 ? (
    <FilterSection title="Renk" defaultOpen>
     <ProductsColorFilter
      selectedColor={selectedColor}
      onColorChange={onColorChange}
      availableColors={availableColors}
     />
    </FilterSection>
   ) : null}
  </aside>
 );
}
