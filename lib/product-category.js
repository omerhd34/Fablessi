import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

function getCategorySlugFromStaticMenu(productSlug) {
 for (const group of productMenuGroupsData) {
  if (group.items.some((item) => item.href === `/urunler/${productSlug}`)) {
   return group.slug;
  }
 }

 return null;
}

export function getCategorySlugForProduct(productOrSlug) {
 if (typeof productOrSlug === "object" && productOrSlug !== null) {
  return (
   productOrSlug.categoryGroup?.slug ??
   getCategorySlugFromStaticMenu(productOrSlug.slug)
  );
 }

 return getCategorySlugFromStaticMenu(productOrSlug);
}

export function getCategoryLabelForProduct(productOrSlug, dictionary) {
 if (typeof productOrSlug === "object" && productOrSlug?.categoryGroup?.name) {
  return productOrSlug.categoryGroup.name;
 }

 const slug = getCategorySlugForProduct(productOrSlug);
 if (!slug) return null;

 return dictionary.categories?.[slug] ?? slug;
}
