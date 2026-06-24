import { getCategorySlugForProduct } from "@/lib/product-category";
import { normalizeForSearch } from "@/lib/search-text";

function getFavoriteSearchText(favorite, dictionary) {
 const categorySlug = getFavoriteCategorySlug(favorite);
 const parts = [
  favorite.name,
  favorite.slug,
  favorite.slug.replace(/-/g, " "),
 ];

 if (categorySlug) {
  parts.push(categorySlug, categorySlug.replace(/-/g, " "));
  parts.push(dictionary?.categories?.[categorySlug]);
 }

 return normalizeForSearch(parts.filter(Boolean).join(" "));
}

export function getFavoriteCategorySlug(favorite) {
 return favorite.categorySlug ?? getCategorySlugForProduct(favorite.slug);
}

export function getAvailableFavoriteCategories(favorites, dictionary) {
 const slugs = new Set();

 for (const favorite of favorites) {
  const slug = getFavoriteCategorySlug(favorite);
  if (slug) slugs.add(slug);
 }

 return [...slugs]
  .map((slug) => ({
   slug,
   label: dictionary.categories?.[slug] ?? slug,
  }))
  .sort((a, b) => a.label.localeCompare(b.label, "tr"));
}

export function filterFavorites(
 favorites,
 { search = "", categorySlug = null, dictionary } = {}
) {
 const query = normalizeForSearch(search.trim());

 return favorites.filter((favorite) => {
  const matchesCategory =
   !categorySlug || getFavoriteCategorySlug(favorite) === categorySlug;

  const matchesSearch =
   !query || getFavoriteSearchText(favorite, dictionary).includes(query);

  return matchesCategory && matchesSearch;
 });
}

function compareFavoriteByPrice(a, b, ascending) {
 const priceA = a.displayPrice ?? null;
 const priceB = b.displayPrice ?? null;

 if (priceA == null && priceB == null) return 0;
 if (priceA == null) return 1;
 if (priceB == null) return -1;

 return ascending ? priceA - priceB : priceB - priceA;
}

export function sortFavorites(favorites, sort) {
 if (!sort) return favorites;

 const list = [...favorites];

 switch (sort) {
  case "price-asc":
   return list.sort((a, b) => compareFavoriteByPrice(a, b, true));
  case "price-desc":
   return list.sort((a, b) => compareFavoriteByPrice(a, b, false));
  case "newest":
   return list.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return dateB - dateA;
   });
  case "recent":
   return list.sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0));
  default:
   return list;
 }
}
