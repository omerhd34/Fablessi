import { t as translate } from "@/lib/i18n/translate";

export function getSortOptions(dictionary) {
 const t = (key) => translate(dictionary, key);

 return [
  { value: "featured", label: t("catalog.sortFeatured") },
  { value: "newest", label: t("catalog.sortNewest") },
  { value: "name-asc", label: t("catalog.sortNameAsc") },
  { value: "name-desc", label: t("catalog.sortNameDesc") },
 ];
}
