import { defaultLocale } from "@/lib/i18n/config";

export function localizeCollection(collection, locale = defaultLocale) {
 if (!collection || locale === defaultLocale) return collection;

 return {
  ...collection,
  name: collection.nameEn || collection.name,
  description: collection.descriptionEn ?? collection.description,
 };
}

export function localizeProduct(product, locale = defaultLocale) {
 if (!product || locale === defaultLocale) return product;

 const localized = {
  ...product,
  name: product.nameEn || product.name,
  description: product.descriptionEn ?? product.description,
 };

 if (product.collection) {
  localized.collection = localizeCollection(product.collection, locale);
 }

 if (product.images) {
  localized.images = product.images.map((image) => ({
   ...image,
   alt: image.altEn || image.alt,
  }));
 }

 if (product.variants) {
  localized.variants = product.variants.map((variant) => ({
   ...variant,
   name: variant.nameEn || variant.name,
   material: variant.materialEn ?? variant.material,
  }));
 }

 return localized;
}
