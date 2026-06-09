"use client";

import { useTranslations } from "@/contexts/locale-provider";
import { cn } from "@/lib/utils";

function FilterOptionButton({ active, onClick, children, className }) {
 return (
  <button
   type="button"
   onClick={onClick}
   className={cn(
    "cursor-pointer transition-colors",
    className,
    active
     ? "border-charcoal/15 bg-cream/70 font-semibold text-charcoal"
     : "border-charcoal/8 bg-white/80 text-charcoal/70 hover:border-charcoal/15 hover:text-charcoal"
   )}
  >
   {children}
  </button>
 );
}

export function FavoritesCategoryFilter({
 categories,
 selectedCategory,
 onCategoryChange,
 variant = "list",
}) {
 const { t } = useTranslations();
 const isGrid = variant === "grid";
 const itemClass = isGrid
  ? "rounded-2xl border px-3 py-2.5 text-center text-sm"
  : "block w-full rounded-lg border px-2.5 py-2 text-left text-sm";

 if (categories.length === 0) return null;

 return (
  <div className={cn(isGrid ? "grid grid-cols-2 gap-2" : "space-y-1")}>
   <FilterOptionButton
    active={!selectedCategory}
    onClick={() => onCategoryChange(null)}
    className={itemClass}
   >
    {t("favorites.allCategories")}
   </FilterOptionButton>
   {categories.map((category) => (
    <FilterOptionButton
     key={category.slug}
     active={selectedCategory === category.slug}
     onClick={() =>
      onCategoryChange(
       selectedCategory === category.slug ? null : category.slug
      )
     }
     className={itemClass}
    >
     {category.label}
    </FilterOptionButton>
   ))}
  </div>
 );
}

export function FavoritesCollectionFilter({
 collections,
 selectedCollection,
 onCollectionChange,
 variant = "list",
}) {
 const { t } = useTranslations();
 const isGrid = variant === "grid";
 const itemClass = isGrid
  ? "rounded-2xl border px-3 py-2.5 text-center text-sm"
  : "block w-full rounded-lg border px-2.5 py-2 text-left text-sm";

 if (collections.length === 0) return null;

 return (
  <div className={cn(isGrid ? "grid grid-cols-2 gap-2" : "space-y-1")}>
   <FilterOptionButton
    active={!selectedCollection}
    onClick={() => onCollectionChange(null)}
    className={itemClass}
   >
    {t("favorites.allCollections")}
   </FilterOptionButton>
   {collections.map((collection) => (
    <FilterOptionButton
     key={collection}
     active={selectedCollection === collection}
     onClick={() =>
      onCollectionChange(selectedCollection === collection ? null : collection)
     }
     className={itemClass}
    >
     {collection}
    </FilterOptionButton>
   ))}
  </div>
 );
}
