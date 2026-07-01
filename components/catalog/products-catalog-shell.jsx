"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductsCatalogToolbar } from "@/components/catalog/products-catalog-toolbar";
import { ProductsCategoryCarousel } from "@/components/catalog/products-category-carousel";
import { ProductsCategoryGrid } from "@/components/catalog/products-category-grid";
import { useLocale } from "@/contexts/locale-provider";
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

function sortProducts(products, sort, t) {
 if (!sort) return products;

 const list = [...products];

 const sortAlphabetical = (a, b) =>
  (a.name || "").localeCompare(b.name || "", t("locale") || "tr");

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
 categorySlug,
}) {
 const { t } = useLocale();
 const [search, setSearch] = useState("");
 const [sort, setSort] = useState(null);

 const isCategoryLanding = !categorySlug;
 const categoryDescription = categorySlug
  ? t(`catalog.categoryDescriptions.${categorySlug}`)
  : null;
 const hasCategoryDescription =
  categoryDescription &&
  categoryDescription !== `catalog.categoryDescriptions.${categorySlug}`;

 const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  const list = products.filter((product) => {
   if (!query) return true;

   return product.name.toLowerCase().includes(query);
  });

  return sortProducts(list, sort, t);
 }, [products, search, sort, t]);

 if (isCategoryLanding) {
  return (
   <div className="space-y-6 md:space-y-8">
    <div className="text-center md:text-left">
     <h1 className={cn(headingDisplayClass, "text-charcoal")}>
      {t("pages.products.title")}
     </h1>
     <p className="text-muted-foreground mx-auto mt-3 max-w-4xl text-sm md:mx-0 md:text-base">
      {t("home.categoriesDescription")}
     </p>
    </div>
    <div data-nosnippet>
     <ProductsCategoryGrid />
    </div>
   </div>
  );
 }

 return (
  <div className="space-y-6 md:space-y-8">
   <div>
    <h1 className={cn(headingDisplayClass, "text-charcoal")}>
     {activeGroup ? activeGroup.label : t("catalog.allProductsTitle")}
    </h1>
    {hasCategoryDescription ? (
     <p className="text-muted-foreground mt-3 max-w-4xl text-sm md:text-base">
      {categoryDescription}
     </p>
    ) : null}
   </div>

   <div data-nosnippet>
    <ProductsCatalogToolbar
     search={search}
     onSearchChange={setSearch}
     sort={sort}
     onSortChange={setSort}
    />

    {filteredProducts.length > 0 ? (
     <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:gap-6 md:mt-8">
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
     <div className="mt-6 rounded-3xl border border-dashed border-charcoal/12 bg-cream/40 px-6 py-20 text-center md:mt-8">
      <p className="text-sm font-medium text-charcoal">
       {t("catalog.noProducts")}
      </p>
      <p className="text-muted-foreground mt-2 text-sm">
       {t("catalog.tryAgain")}
      </p>
     </div>
    )}

    {categorySlug ? (
     <div className="mt-8 md:mt-12">
      <div
       className="border-t border-charcoal/8"
       role="separator"
       aria-hidden="true"
      />
      <div className="pt-5 md:pt-8">
       <ProductsCategoryCarousel activeSlug={categorySlug} />
      </div>
     </div>
    ) : null}
   </div>
  </div>
 );
}
