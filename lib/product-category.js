import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

export function getCategorySlugForProduct(productSlug) {
 for (const group of productMenuGroupsData) {
  if (group.items.some((item) => item.href === `/urunler/${productSlug}`)) {
   return group.slug;
  }
 }

 return null;
}

export function getCategoryLabelForProduct(productSlug, dictionary) {
 const slug = getCategorySlugForProduct(productSlug);
 if (!slug) return null;

 return dictionary.categories?.[slug] ?? slug;
}
