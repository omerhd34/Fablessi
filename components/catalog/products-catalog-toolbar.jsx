"use client";

import { ProductsMobileCatalogControls } from "@/components/catalog/products-mobile-catalog-controls";
import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import { Search } from "@/lib/icons";

export function ProductsCatalogToolbar({
 search,
 onSearchChange,
 sort,
 onSortChange,
 resultCount,
}) {
 const { t } = useTranslations();

 return (
  <>
   <ProductsMobileCatalogControls
    search={search}
    onSearchChange={onSearchChange}
    sort={sort}
    onSortChange={onSortChange}
   />

   <div className="hidden flex-col gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
    <form
     role="search"
     onSubmit={(event) => event.preventDefault()}
     className="header-search-pill flex-1"
    >
     <div className="header-search-pill__field">
      <input
       type="search"
       value={search}
       onChange={(event) => onSearchChange(event.target.value)}
       placeholder={t("catalog.searchProductsPlaceholder")}
       className="header-search-pill__input"
       aria-label={t("catalog.searchProducts")}
      />
      <Search className="header-search-pill__icon" aria-hidden />
     </div>
    </form>

    <ProductsSortMenu sort={sort} onSortChange={onSortChange} />

    <p className="text-muted-foreground text-sm lg:sr-only">
     {t("catalog.productsCount", { count: resultCount })}
    </p>
   </div>
  </>
 );
}
