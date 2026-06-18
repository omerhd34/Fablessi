import { getCategorySlugForProduct } from "@/lib/product-category";
import { getPrimaryImageUrl, getProductDisplayPrice } from "@/lib/product-utils";

export const FAVORITES_STORAGE_KEY = "fablessi:favorites";

export function createFavoriteSnapshot(product) {
 return {
  slug: product.slug,
  categorySlug: product.categoryGroup?.slug ?? getCategorySlugForProduct(product.slug),
  collectionSlug: product.collection?.slug ?? null,
  collectionName: product.collection?.name ?? null,
  name: product.name ?? null,
  imageUrl: getPrimaryImageUrl(product),
  addedAt: Date.now(),
  displayPrice: getProductDisplayPrice(product),
  createdAt: product.createdAt ?? null,
 };
}

export function readFavorites() {
 if (typeof window === "undefined") return [];

 try {
  const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!raw) return [];

  const parsed = JSON.parse(raw);
  return Array.isArray(parsed)
   ? parsed.filter((item) => typeof item?.slug === "string")
   : [];
 } catch {
  return [];
 }
}

export function writeFavorites(favorites) {
 if (typeof window === "undefined") return;

 try {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
 } catch {
  // Private mode or quota exceeded — ignore silently.
 }
}

export function enrichFavoriteForDisplay(favorite, productMetaBySlug = {}) {
 const meta = productMetaBySlug[favorite.slug];
 if (!meta) return favorite;

 return {
  ...favorite,
  name: favorite.name ?? meta.name ?? favorite.collectionName,
  displayPrice: favorite.displayPrice ?? meta.displayPrice ?? null,
  createdAt: favorite.createdAt ?? meta.createdAt ?? null,
 };
}

export function favoriteToProductCard(favorite) {
 return {
  slug: favorite.slug,
  name: favorite.name ?? favorite.collectionName ?? favorite.slug,
  displayPrice: favorite.displayPrice ?? null,
  categorySlug: favorite.categorySlug ?? getCategorySlugForProduct(favorite.slug),
  images: favorite.imageUrl
   ? [{ url: favorite.imageUrl, alt: favorite.collectionName ?? favorite.name }]
   : [],
  collection: favorite.collectionName
   ? {
    name: favorite.collectionName,
    slug: favorite.collectionSlug ?? null,
   }
   : null,
 };
}
