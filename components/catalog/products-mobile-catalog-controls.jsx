"use client";

import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import { Search, X } from "@/lib/icons";
import {
 catalogMobileGlassClass,
 catalogMobileSearchClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductsMobileCatalogControls({
 search,
 onSearchChange,
 sort,
 onSortChange,
}) {
 const { t } = useTranslations();

 return (
  <div className="flex items-center gap-3 lg:hidden">
   <form
    role="search"
    onSubmit={(event) => event.preventDefault()}
    className={cn(
     catalogMobileSearchClass,
     catalogMobileGlassClass,
     "min-w-0 flex-1"
    )}
   >
    <Search
     className="size-4 shrink-0 scale-100 text-charcoal/45 transition-[scale] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-125 motion-reduce:duration-150"
     aria-hidden
    />
    <input
     type="search"
     value={search}
     onChange={(event) => onSearchChange(event.target.value)}
     placeholder={t("catalog.searchProductsPlaceholder")}
     className="min-w-0 flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/45"
     aria-label={t("catalog.searchProducts")}
    />
    {search ? (
     <button
      type="button"
      onClick={() => onSearchChange("")}
      className="flex size-6 cursor-pointer items-center justify-center rounded-full text-charcoal/40 transition hover:bg-charcoal/5 hover:text-charcoal"
      aria-label={t("common.clearSearch")}
     >
      <X className="size-3.5" />
     </button>
    ) : null}
   </form>

   <ProductsSortMenu sort={sort} onSortChange={onSortChange} />
  </div>
 );
}
