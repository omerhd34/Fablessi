import { getLocalizedMenuProductLabel } from "@/lib/i18n/display-names";
import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

function getProductSlugFromHref(href) {
 return href.replace("/urunler/", "");
}

export function buildStaticMenuGroups(dictionary) {
 return productMenuGroupsData.map((group) => ({
  slug: group.slug,
  href: group.href,
  label: dictionary.categories[group.slug] ?? group.slug,
  coverImage: group.items[0]?.image ?? null,
  items: group.items.map((item) => {
   const slug = item.slug ?? getProductSlugFromHref(item.href);

   return {
    ...item,
    slug,
    label: getLocalizedMenuProductLabel(slug, dictionary, item.label),
   };
  }),
 }));
}
