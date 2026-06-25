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

export const CORNER_CATEGORY_SLUG = "kose-gruplari";

export function isCornerGroupProduct(product) {
 return getCategorySlugForProduct(product) === CORNER_CATEGORY_SLUG;
}

export function getCategoryLabelForProduct(productOrSlug, dictionary) {
 const slug = getCategorySlugForProduct(productOrSlug);

 if (slug && dictionary.categories?.[slug]) {
  return dictionary.categories[slug];
 }

 if (typeof productOrSlug === "object" && productOrSlug?.categoryGroup?.name) {
  return productOrSlug.categoryGroup.name;
 }

 if (!slug) return null;

 return slug;
}
