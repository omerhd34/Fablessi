import { defaultLocale } from "@/lib/i18n/config";

export function localizeCategoryGroup(group, locale = defaultLocale) {
 if (!group || locale === defaultLocale) return group;

 return {
  ...group,
  name: group.nameEn || group.name,
 };
}

export function localizeCollection(collection, locale = defaultLocale) {
 if (!collection || locale === defaultLocale) return collection;

 return {
  ...collection,
  name: collection.nameEn || collection.name,
 };
}

export function localizeProduct(product, locale = defaultLocale) {
 if (!product || locale === defaultLocale) return product;

 const localized = {
  ...product,
  name: product.nameEn || product.name,
  description: product.descriptionEn ?? product.description,
  material: product.materialEn ?? product.material,
 };

 if (product.collection) {
  localized.collection = localizeCollection(product.collection, locale);
 }

 if (product.categoryGroup) {
  localized.categoryGroup = localizeCategoryGroup(product.categoryGroup, locale);
 }

 if (product.images) {
  localized.images = product.images.map((image) => ({
   ...image,
   alt: image.altEn || image.alt,
  }));
 }

 if (product.dimensionItems) {
  localized.dimensionItems = product.dimensionItems.map((item) => ({
   ...item,
   name: item.nameEn || item.name,
  }));
 }

 return localized;
}
