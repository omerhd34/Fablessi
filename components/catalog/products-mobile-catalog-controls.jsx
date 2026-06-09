"use client";

import { useMemo, useState } from "react";
import {
 ProductsCategoryFilter,
 ProductsColorFilter,
} from "@/components/catalog/products-filter-content";
import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import { getColorLabel } from "@/lib/catalog-colors";
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";
import { CloseIcon, FilterIcon, Search, X } from "@/lib/icons";
import { cn } from "@/lib/utils";

function ActiveFilterChip({ label, onRemove, removeLabel }) {
 return (
  <button
   type="button"
   onClick={onRemove}
   className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-charcoal/12 bg-white px-3 py-1.5 text-xs font-medium text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] transition hover:border-charcoal/20"
  >
   <span>{label}</span>
   <X className="size-3 text-charcoal/50" aria-hidden />
   <span className="sr-only">{removeLabel}</span>
  </button>
 );
}

export function ProductsMobileCatalogControls({
 search,
 onSearchChange,
 sort,
 onSortChange,
 selectedColor,
 onColorChange,
 availableColors,
 categorySlug,
 resultCount,
}) {
 const { t } = useTranslations();
 const [filterOpen, setFilterOpen] = useState(false);

 const activeFilterCount = useMemo(() => {
  let count = 0;
  if (selectedColor) count += 1;
  return count;
 }, [selectedColor]);

 return (
  <div className="space-y-3 lg:hidden">
   <div className="flex items-center gap-2.5">
    <button
     type="button"
     onClick={() => setFilterOpen(true)}
     className="catalog-mobile-action flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-charcoal/12 bg-white px-4 text-sm font-medium text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] transition hover:border-charcoal/20"
     aria-expanded={filterOpen}
    >
     <FilterIcon className="size-4 text-charcoal/65" aria-hidden />
     <span>{t("catalog.filter")}</span>
     {activeFilterCount > 0 ? (
      <span className="flex size-5 items-center justify-center rounded-full bg-charcoal text-[0.65rem] font-semibold text-white">
       {activeFilterCount}
      </span>
     ) : null}
    </button>

    <ProductsSortMenu sort={sort} onSortChange={onSortChange} compact />
   </div>

   <form
    role="search"
    onSubmit={(event) => event.preventDefault()}
    className="catalog-mobile-search flex h-11 items-center gap-2.5 rounded-full border border-charcoal/12 bg-white px-4 shadow-[0_1px_2px_rgb(0_0_0/4%)]"
   >
    <Search className="size-4 shrink-0 text-charcoal/45" aria-hidden />
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

   {(selectedColor || search.trim()) && (
    <div className="flex flex-wrap items-center gap-2">
     {selectedColor ? (
      <ActiveFilterChip
       label={getColorLabel(selectedColor, t)}
       onRemove={() => onColorChange(null)}
       removeLabel={t("catalog.removeFilter")}
      />
     ) : null}
     {search.trim() ? (
      <ActiveFilterChip
       label={`"${search.trim()}"`}
       onRemove={() => onSearchChange("")}
       removeLabel={t("catalog.removeFilter")}
      />
     ) : null}
     <button
      type="button"
      onClick={() => {
       onColorChange(null);
       onSearchChange("");
      }}
      className="cursor-pointer text-xs font-medium text-charcoal/50 transition hover:text-charcoal"
     >
      {t("catalog.clearAll")}
     </button>
    </div>
   )}

   <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
    <SheetContent
     side="bottom"
     showCloseButton={false}
     className="catalog-filter-sheet flex max-h-[min(88dvh,40rem)] flex-col rounded-t-[1.75rem] border-charcoal/10 bg-cream/95 p-0 text-charcoal backdrop-blur-xl"
    >
     <SheetHeader className="sr-only">
      <SheetTitle>{t("catalog.productFilters")}</SheetTitle>
     </SheetHeader>

     <div className="flex shrink-0 items-center justify-between border-b border-charcoal/8 px-5 py-4">
      <div>
       <p className="text-base font-semibold text-charcoal">{t("catalog.filter")}</p>
       <p className="mt-0.5 text-xs text-charcoal/50">
        {t("catalog.selectCategoryColor")}
       </p>
      </div>
      <button
       type="button"
       onClick={() => setFilterOpen(false)}
       className="flex size-9 cursor-pointer items-center justify-center rounded-full text-charcoal/60 transition hover:bg-charcoal/6 hover:text-charcoal"
       aria-label={t("catalog.closeFilters")}
      >
       <CloseIcon className="size-5 stroke-[1.75]" aria-hidden />
      </button>
     </div>

     <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
      <section>
       <h3 className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
        {t("catalog.category")}
       </h3>
       <div className="mt-3">
        <ProductsCategoryFilter
         categorySlug={categorySlug}
         variant="grid"
         onNavigate={() => setFilterOpen(false)}
        />
       </div>
      </section>

      {availableColors.length > 0 ? (
       <section className="mt-6 border-t border-charcoal/8 pt-6">
        <h3 className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
         {t("catalog.color")}
        </h3>
        <div className="mt-3">
         <ProductsColorFilter
          selectedColor={selectedColor}
          onColorChange={onColorChange}
          availableColors={availableColors}
          variant="compact"
         />
        </div>
       </section>
      ) : null}
     </div>

     <div className="flex shrink-0 gap-2.5 border-t border-charcoal/8 px-5 py-4">
      <button
       type="button"
       onClick={() => {
        onColorChange(null);
       }}
       disabled={!selectedColor}
       className={cn(
        "h-11 flex-1 cursor-pointer rounded-full border border-charcoal/12 bg-white text-sm font-medium text-charcoal transition hover:border-charcoal/20 disabled:cursor-not-allowed disabled:opacity-40"
       )}
      >
       {t("catalog.clear")}
      </button>
      <button
       type="button"
       onClick={() => setFilterOpen(false)}
       className="h-11 flex-1 cursor-pointer rounded-full bg-charcoal text-sm font-medium text-white transition hover:bg-charcoal/90"
      >
       {t("catalog.showProducts", { count: resultCount })}
      </button>
     </div>
    </SheetContent>
   </Sheet>
  </div>
 );
}
