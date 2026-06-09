import { getCategorySlugForProduct } from "@/lib/product-category";
import { normalizeForSearch } from "@/lib/search-text";

function getFavoriteSearchText(favorite, dictionary) {
 const categorySlug = getFavoriteCategorySlug(favorite);
 const parts = [
  favorite.collectionName,
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

export function getAvailableFavoriteCollections(favorites) {
 const names = new Set();

 for (const favorite of favorites) {
  if (favorite.collectionName) names.add(favorite.collectionName);
 }

 return [...names].sort((a, b) => a.localeCompare(b, "tr"));
}

export function filterFavorites(
 favorites,
 { search = "", categorySlug = null, collectionName = null, dictionary } = {}
) {
 const query = normalizeForSearch(search.trim());

 return favorites.filter((favorite) => {
  const matchesCategory =
   !categorySlug || getFavoriteCategorySlug(favorite) === categorySlug;

  const matchesCollection =
   !collectionName || favorite.collectionName === collectionName;

  const matchesSearch =
   !query || getFavoriteSearchText(favorite, dictionary).includes(query);

  return matchesCategory && matchesCollection && matchesSearch;
 });
}

export function sortFavorites(favorites, sort) {
 const list = [...favorites];

 switch (sort) {
  case "name-asc":
   return list.sort((a, b) =>
    (a.collectionName ?? a.slug).localeCompare(b.collectionName ?? b.slug, "tr")
   );
  case "name-desc":
   return list.sort((a, b) =>
    (b.collectionName ?? b.slug).localeCompare(a.collectionName ?? a.slug, "tr")
   );
  case "recent":
  default:
   return list.sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0));
 }
}
