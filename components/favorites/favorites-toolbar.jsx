"use client";

import { FavoritesMobileControls } from "@/components/favorites/favorites-mobile-controls";
import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import { getFavoritesSortOptions } from "@/lib/i18n/catalog";
import { Search } from "@/lib/icons";

export function FavoritesToolbar({
 search,
 onSearchChange,
 sort,
 onSortChange,
 resultCount,
 categories,
 collections,
 selectedCategory,
 onCategoryChange,
 selectedCollection,
 onCollectionChange,
}) {
 const { t, dictionary } = useTranslations();
 const sortOptions = getFavoritesSortOptions(dictionary);

 return (
  <>
   <FavoritesMobileControls
    search={search}
    onSearchChange={onSearchChange}
    sort={sort}
    onSortChange={onSortChange}
    resultCount={resultCount}
    categories={categories}
    collections={collections}
    selectedCategory={selectedCategory}
    onCategoryChange={onCategoryChange}
    selectedCollection={selectedCollection}
    onCollectionChange={onCollectionChange}
    sortOptions={sortOptions}
   />

   <div className="hidden flex-col gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
    <form
     role="search"
     onSubmit={(event) => event.preventDefault()}
     className="header-search-pill flex flex-1 items-center gap-3"
    >
     <input
      type="search"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder={t("favorites.searchPlaceholder")}
      className="min-w-0 flex-1 bg-transparent text-base text-charcoal outline-none placeholder:text-charcoal/45"
      aria-label={t("favorites.search")}
     />
     <Search className="size-5 shrink-0 text-charcoal/55" aria-hidden />
    </form>

    <ProductsSortMenu
     sort={sort}
     onSortChange={onSortChange}
     sortOptions={sortOptions}
    />

    <p className="text-muted-foreground text-sm lg:sr-only">
     {t("catalog.productsCount", { count: resultCount })}
    </p>
   </div>
  </>
 );
}
