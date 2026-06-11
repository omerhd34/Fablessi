import { t as translate } from "@/lib/i18n/translate";

export function getFavoritesSortOptions(dictionary) {
 const t = (key) => translate(dictionary, key);

 return [
  {
   value: "recent",
   label: t("favorites.sortRecentlyAdded"),
   triggerLabel: t("favorites.sortRecentlyAdded"),
  },
  {
   value: "name-asc",
   label: t("catalog.sortNameAsc"),
   triggerLabel: t("catalog.sortNameAsc"),
  },
  {
   value: "name-desc",
   label: t("catalog.sortNameDesc"),
   triggerLabel: t("catalog.sortNameDesc"),
  },
 ];
}

export function getSortOptions(dictionary) {
 const t = (key) => translate(dictionary, key);

 return [
  {
   value: "newest",
   label: t("catalog.sortNewest"),
   triggerLabel: t("catalog.sortNewest"),
  },
  {
   value: "price-asc",
   label: t("catalog.sortPriceAsc"),
   triggerLabel: t("catalog.sortPriceAsc"),
  },
  {
   value: "price-desc",
   label: t("catalog.sortPriceDesc"),
   triggerLabel: t("catalog.sortPriceDesc"),
  },
 ];
}
