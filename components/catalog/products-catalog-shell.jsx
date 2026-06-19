"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductsCatalogToolbar } from "@/components/catalog/products-catalog-toolbar";
import { ProductsCategoryCarousel } from "@/components/catalog/products-category-carousel";
import { ProductsCategoryGrid } from "@/components/catalog/products-category-grid";
import { useLocale } from "@/contexts/locale-provider";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { getProductDisplayPrice } from "@/lib/product-utils";
import { headingDisplayClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

function compareByPrice(a, b, ascending) {
 const priceA = getProductDisplayPrice(a);
 const priceB = getProductDisplayPrice(b);

 if (priceA == null && priceB == null) return 0;
 if (priceA == null) return 1;
 if (priceB == null) return -1;

 return ascending ? priceA - priceB : priceB - priceA;
}

function sortProducts(products, sort, dictionary, t) {
 if (!sort && products.length) {
  const list = [...products];
  const sortAlphabetical = (a, b) => {
   const aLabel = getLocalizedCollectionName(a.collection, dictionary) || a.name || "";
   const bLabel = getLocalizedCollectionName(b.collection, dictionary) || b.name || "";
   return aLabel.localeCompare(bLabel, t("locale") || "tr");
  };
  return list.sort(sortAlphabetical);
 }

 if (!sort) return products;

 const list = [...products];

 const sortAlphabetical = (a, b) => {
  const aLabel = getLocalizedCollectionName(a.collection, dictionary) || a.name || "";
  const bLabel = getLocalizedCollectionName(b.collection, dictionary) || b.name || "";
  return aLabel.localeCompare(bLabel, t("locale") || "tr");
 };

 switch (sort) {
  case "price-asc":
   return list.sort((a, b) => compareByPrice(a, b, true));
  case "price-desc":
   return list.sort((a, b) => compareByPrice(a, b, false));
  case "newest":
   return list.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
   );
  default:
   return list.sort(sortAlphabetical);
 }
}

export function ProductsCatalogShell({
 products,
 activeGroup,
 activeCollection,
 categorySlug,
 collectionSlug,
}) {
 const { t, dictionary } = useLocale();
 const [search, setSearch] = useState("");
 const [sort, setSort] = useState(null);

 const isCategoryLanding = !categorySlug && !collectionSlug;

 const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  const list = products.filter((product) => {
   if (!query) return true;

   return (
    product.name.toLowerCase().includes(query) ||
    product.collection?.name?.toLowerCase().includes(query)
   );
  });

  return sortProducts(list, sort, dictionary, t);
 }, [products, search, sort, dictionary, t]);

 if (isCategoryLanding) {
  return (
   <div className="space-y-6 md:space-y-8">
    <div className="text-center md:text-left">
     <h1 className={cn(headingDisplayClass, "text-charcoal")}>
      {t("home.categoriesTitle")}
     </h1>
     <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:mx-0 md:text-base">
      {t("home.categoriesDescription")}
     </p>
    </div>
    <ProductsCategoryGrid />
   </div>
  );
 }

 return (
  <div className="space-y-6 md:space-y-8">
   <div>
    <h1 className={cn(headingDisplayClass, "text-charcoal")}>
     {activeCollection
      ? getLocalizedCollectionName(activeCollection, dictionary) ??
      activeCollection.name
      : activeGroup
       ? activeGroup.label
       : t("catalog.allProductsTitle")}
    </h1>
   </div>

   <ProductsCatalogToolbar
    search={search}
    onSearchChange={setSearch}
    sort={sort}
    onSortChange={setSort}
   />

   {filteredProducts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:gap-6">
     {filteredProducts.map((product, index) => (
      <ProductCard
       key={product.id}
       product={product}
       priority={index < 2}
       variant="catalog"
      />
     ))}
    </div>
   ) : (
    <div className="rounded-3xl border border-dashed border-charcoal/12 bg-cream/40 px-6 py-20 text-center">
     <p className="text-sm font-medium text-charcoal">
      {t("catalog.noProducts")}
     </p>
     <p className="text-muted-foreground mt-2 text-sm">
      {t("catalog.tryAgain")}
     </p>
    </div>
   )}

   {categorySlug ? (
    <div className="border-t border-charcoal/8 pt-8 md:pt-10">
     <ProductsCategoryCarousel activeSlug={categorySlug} />
    </div>
   ) : null}
  </div>
 );
}
