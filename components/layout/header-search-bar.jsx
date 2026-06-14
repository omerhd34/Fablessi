/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Folder, Search, X } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { getCategoryLabelForProduct } from "@/lib/product-category";
import { getCollectionProductsHref, getPrimaryImageUrl } from "@/lib/product-utils";
import {
 catalogSearchFieldClass,
 catalogSearchIconClass,
 catalogSearchInputClass,
 catalogSearchPillClass,
} from "@/lib/layout/header-styles";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

function SearchProductCard({ product, onNavigate, dictionary }) {
 const imageUrl = getPrimaryImageUrl(product);
 const categoryLabel = getCategoryLabelForProduct(product, dictionary);
 const bottomLabel =
  getLocalizedCollectionName(product.collection, dictionary) ?? product.name;

 return (
  <Link
   href={`/urunler/${product.slug}`}
   onClick={onNavigate}
   className="group block"
  >
   <div className="search-product-card relative aspect-5/4 overflow-hidden rounded-2xl border border-charcoal/10 bg-cream/50 shadow-[0_2px_10px_rgb(0_0_0/5%)] transition-[border-color,box-shadow] duration-200 hover:border-charcoal/20 hover:shadow-[0_6px_20px_rgb(0_0_0/8%)]">
    {imageUrl ? (
     <Image
      src={imageUrl}
      alt={product.images?.[0]?.alt ?? product.name}
      fill
      sizes="(max-width: 640px) 50vw, 25vw"
      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
     />
    ) : (
     <div className="absolute inset-0 bg-cream/70" aria-hidden />
    )}
    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
    {categoryLabel ? (
     <span className="absolute top-2 right-2 z-10 inline-flex rounded-2xl bg-white/92 px-2.5 py-1 text-[0.65rem] font-semibold text-charcoal shadow-sm backdrop-blur-sm">
      {categoryLabel}
     </span>
    ) : null}
    <div className="absolute right-2 bottom-2 left-2">
     <span className="inline-flex max-w-[85%] rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm">
      {bottomLabel}
     </span>
    </div>
   </div>
  </Link>
 );
}

export function HeaderSearchBar({ open, onClose }) {
 const { t, dictionary } = useTranslations();
 const pathname = usePathname();
 const isHome = pathname === "/";
 const inputRef = useRef(null);
 const [mounted, setMounted] = useState(false);
 const [query, setQuery] = useState("");
 const [submittedQuery, setSubmittedQuery] = useState("");
 const [loading, setLoading] = useState(false);
 const [results, setResults] = useState({ collections: [], products: [] });

 useEffect(() => {
  setMounted(true);
 }, []);

 useEffect(() => {
  if (!open) {
   setQuery("");
   setSubmittedQuery("");
   setResults({ collections: [], products: [] });
   setLoading(false);
   return;
  }

  const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
  return () => window.clearTimeout(timer);
 }, [open]);

 const showResultsPanel = Boolean(submittedQuery);

 useEffect(() => {
  if (!submittedQuery) {
   setResults({ collections: [], products: [] });
   setLoading(false);
   return;
  }

  setLoading(true);
  const controller = new AbortController();

  (async () => {
   try {
    const response = await fetch(
     `/api/search?q=${encodeURIComponent(submittedQuery)}`,
     { signal: controller.signal }
    );
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    setResults({
     collections: data.collections ?? [],
     products: data.products ?? [],
    });
   } catch (error) {
    if (error.name !== "AbortError") {
     setResults({ collections: [], products: [] });
    }
   } finally {
    setLoading(false);
   }
  })();

  return () => controller.abort();
 }, [submittedQuery]);

 const handleNavigate = useCallback(() => {
  onClose();
 }, [onClose]);

 const handleSubmit = (event) => {
  event.preventDefault();
  setSubmittedQuery(query.trim());
 };

 const handleClear = () => {
  setQuery("");
  setSubmittedQuery("");
  setResults({ collections: [], products: [] });
  setLoading(false);
  inputRef.current?.focus();
 };

 const hasResults =
  results.collections.length > 0 || results.products.length > 0;
 const showEmpty = submittedQuery && !loading && !hasResults;

 const resultsPanel =
  showResultsPanel ? (
   <div
    className={cn(
     "mt-3 max-h-[min(70vh,36rem)] overflow-y-auto rounded-[1.75rem] border border-(--pill-border) bg-[oklch(0.995_0.004_90/96%)] p-5 shadow-[0_12px_48px_rgb(0_0_0/12%)] transition-[opacity,transform] duration-220 ease-out",
     (hasResults || loading || showEmpty)
      ? "translate-y-0 opacity-100"
      : "translate-y-[-0.35rem] opacity-0"
    )}
   >
    {loading ? (
     <div className="flex justify-center px-2 py-6 text-center text-sm text-charcoal/60">
      <div className="relative grid size-[3.25rem] place-items-center" role="status" aria-label={t("common.searching")}>
       <div className="absolute inset-0 animate-[search-overlay-loader-spin_0.9s_cubic-bezier(0.45,0.05,0.35,0.95)_infinite] rounded-full border-2 border-charcoal/10 border-t-kalif-blue border-r-[oklch(0.52_0.14_250/40%)]" />
       <div className="absolute inset-[0.4rem] animate-[search-overlay-loader-glow_1.6s_ease-in-out_infinite] rounded-full bg-[oklch(0.52_0.14_250/6%)]" />
       <Search className="relative z-1 size-[1.125rem] animate-[search-overlay-loader-icon_1.6s_ease-in-out_infinite] text-charcoal/70" aria-hidden />
      </div>
     </div>
    ) : null}

    {!loading && results.collections.length > 0 ? (
     <section className="not-first:mt-5 not-first:border-t not-first:border-charcoal/8 not-first:pt-5">
      <h3 className="mb-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-charcoal/60 uppercase">
       {t("catalog.collections")}
      </h3>
      <ul className="flex flex-wrap gap-2">
       {results.collections.map((collection) => (
        <li key={collection.id}>
         <Link
          href={getCollectionProductsHref(collection.slug)}
          onClick={handleNavigate}
          className="inline-flex items-center gap-2 rounded-full border border-charcoal/12 bg-white/90 px-3.5 py-2 text-sm font-medium text-charcoal transition-[border-color,background-color] duration-200 hover:border-charcoal/22 hover:bg-cream/80"
         >
          <Folder
           className="size-4 shrink-0 text-charcoal/55"
           aria-hidden
          />
          {getLocalizedCollectionName(collection, dictionary) ?? collection.name}
         </Link>
        </li>
       ))}
      </ul>
     </section>
    ) : null}

    {!loading && results.products.length > 0 ? (
     <section className="not-first:mt-5 not-first:border-t not-first:border-charcoal/8 not-first:pt-5">
      <h3 className="mb-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-charcoal/60 uppercase">
       {t("catalog.products")}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
       {results.products.map((product) => (
        <SearchProductCard
         key={product.id}
         product={product}
         dictionary={dictionary}
         onNavigate={handleNavigate}
        />
       ))}
      </div>
     </section>
    ) : null}

    {showEmpty ? (
     <p className="px-2 py-6 text-center text-sm text-charcoal/60">{t("catalog.noSearchResults")}</p>
    ) : null}
   </div>
  ) : null;

 const searchForm = (
  <form
   onSubmit={handleSubmit}
   className={catalogSearchPillClass}
   role="search"
  >
   <div className={catalogSearchFieldClass}>
    <input
     ref={inputRef}
     type="text"
     inputMode="search"
     enterKeyHint="search"
     autoComplete="off"
     autoCorrect="off"
     spellCheck={false}
     value={query}
     onChange={(event) => setQuery(event.target.value)}
     placeholder={t("common.searchPlaceholder")}
     className={catalogSearchInputClass}
     aria-label={t("common.searchLabel")}
    />
    <div className="flex shrink-0 items-center gap-0.5">
     {query ? (
      <button
       type="button"
       onClick={handleClear}
       className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-charcoal/55 transition-opacity duration-150 hover:opacity-65"
       aria-label={t("common.clearSearch")}
      >
       <X className="size-4" aria-hidden />
      </button>
     ) : null}
     <button
      type="submit"
      className="flex size-7 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent text-charcoal/78 transition-opacity duration-150 hover:opacity-65"
      aria-label={t("common.search")}
     >
      <Search className="size-[1.125rem]" aria-hidden />
     </button>
    </div>
   </div>
  </form>
 );

 return (
  <>
   {mounted && open
    ? createPortal(
     <button
      type="button"
      className={cn(
       "search-backdrop-layer fixed inset-0 z-40 cursor-pointer border-0 bg-black/38 animate-[search-backdrop-in_0.28s_ease-out] [backdrop-filter:blur(3px)] [-webkit-backdrop-filter:blur(3px)]",
       isHome && "bg-black/45"
      )}
      onClick={onClose}
      aria-label={t("common.closeSearch")}
     />,
     document.body
    )
    : null}

   {open ? (
    <div
     className={cn("header-search-shell relative z-2 pb-4", containerPremiumClass)}
     role={showResultsPanel ? "dialog" : undefined}
     aria-modal={showResultsPanel ? "true" : undefined}
     aria-label={showResultsPanel ? t("common.searchResults") : undefined}
    >
     {searchForm}
     {resultsPanel}
    </div>
   ) : null}

   {mounted && open && showResultsPanel && !isHome
    ? createPortal(
     <button
      type="button"
      className="search-results-backdrop fixed right-0 bottom-0 left-0 z-40 cursor-pointer border-0 bg-[oklch(0.99_0.006_88/55%)] [backdrop-filter:blur(14px)_saturate(120%)] [-webkit-backdrop-filter:blur(14px)_saturate(120%)] top-[calc(var(--header-height-mobile)+var(--search-bar-height))] sm:max-lg:[top:calc(var(--header-height-mobile-sm)+var(--search-bar-height))] lg:[top:calc(var(--header-height-desktop)+var(--search-bar-height))]"
      onClick={onClose}
      aria-label={t("common.closeSearch")}
     />,
     document.body
    )
    : null}
  </>
 );
}
