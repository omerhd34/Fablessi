"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductsCatalogToolbar } from "@/components/catalog/products-catalog-toolbar";
import { ProductsCategoryCarousel } from "@/components/catalog/products-category-carousel";
import { useLocale } from "@/contexts/locale-provider";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { getProductDisplayPrice } from "@/lib/product-utils";

function compareByPrice(a, b, ascending) {
 const priceA = getProductDisplayPrice(a);
 const priceB = getProductDisplayPrice(b);

 if (priceA == null && priceB == null) return 0;
 if (priceA == null) return 1;
 if (priceB == null) return -1;

 return ascending ? priceA - priceB : priceB - priceA;
}

function sortProducts(products, sort) {
 const list = [...products];

 switch (sort) {
  case "price-asc":
   return list.sort((a, b) => compareByPrice(a, b, true));
  case "price-desc":
   return list.sort((a, b) => compareByPrice(a, b, false));
  case "newest":
  default:
   return list.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
   );
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
 const [sort, setSort] = useState("newest");

 const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  const list = products.filter((product) => {
   if (!query) return true;

   return (
    product.name.toLowerCase().includes(query) ||
    product.collection?.name?.toLowerCase().includes(query)
   );
  });

  return sortProducts(list, sort);
 }, [products, search, sort]);

 return (
  <div className="space-y-6 md:space-y-8">
   <div>
    <h1 className="heading-display text-charcoal">
     {activeCollection
      ? getLocalizedCollectionName(activeCollection, dictionary) ??
      activeCollection.name
      : activeGroup
       ? activeGroup.label
       : t("catalog.allProductsTitle")}
    </h1>
    <p className="text-muted-foreground mt-2 hidden text-sm lg:block">
     {t("catalog.listing", { count: filteredProducts.length })}
    </p>
   </div>

   {!categorySlug && !collectionSlug ? (
    <ProductsCategoryCarousel
     activeSlug={categorySlug}
     className="hidden md:block"
    />
   ) : null}

   <ProductsCatalogToolbar
    search={search}
    onSearchChange={setSearch}
    sort={sort}
    onSortChange={setSort}
    resultCount={filteredProducts.length}
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
  </div>
 );
}
