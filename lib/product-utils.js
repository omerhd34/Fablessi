import { defaultLocale } from "@/lib/i18n/config";
import { localizeProduct } from "@/lib/i18n/localize-product";
import { catalogColorSwatches } from "@/lib/catalog-colors";

export function getCollectionProductsHref(collectionSlug) {
 return `/urunler?koleksiyon=${collectionSlug}`;
}

export function getPrimaryImageUrl(product) {
 return product.images?.[0]?.url ?? null;
}

export function serializeProduct(product, locale = defaultLocale) {
 if (!product) return product;

 return localizeProduct(
  {
   ...product,
   widthCm: product.widthCm != null ? Number(product.widthCm) : null,
   heightCm: product.heightCm != null ? Number(product.heightCm) : null,
   depthCm: product.depthCm != null ? Number(product.depthCm) : null,
  },
  locale
 );
}

export function getProductCardLabel(product) {
 const collectionName = product.collection?.name?.trim();
 if (!collectionName) return product.name;

 const prefix = `${collectionName} `;
 if (product.name.startsWith(prefix)) {
  return product.name.slice(prefix.length).trim() || product.name;
 }

 return product.name;
}

export function getProductShortName(product) {
 return product.collection?.name ?? product.name;
}

export function colorToImagePrefix(color) {
 if (!color) return null;
 return color.toLocaleLowerCase("tr");
}

export function getAlternateColorVariant(variants, selectedVariant) {
 const colorVariants = variants.filter((variant) => variant.color);

 if (colorVariants.length < 2) return null;

 return (
  colorVariants.find((variant) => variant.id !== selectedVariant?.id) ?? null
 );
}

export function getImagesForVariant(images, variant) {
 if (!variant?.color) return images;

 const prefix = colorToImagePrefix(variant.color);
 const filtered = images.filter((image) => {
  const fileName = image.url.split("/").pop()?.toLowerCase() ?? "";
  return fileName.startsWith(prefix);
 });

 return filtered.length > 0 ? filtered : images;
}

export function getColorSwatch(color) {
 return catalogColorSwatches[color] ?? "#d1d5db";
}

export function getDimensionLabels(product, t) {
 const labels = [];

 if (product.widthCm) {
  labels.push({
   key: "width",
   label: t?.("product.width") ?? "Genişlik",
   value: `${Number(product.widthCm)} cm`,
  });
 }

 if (product.depthCm) {
  labels.push({
   key: "depth",
   label: t?.("product.depth") ?? "Derinlik",
   value: `${Number(product.depthCm)} cm`,
  });
 }

 if (product.heightCm) {
  labels.push({
   key: "height",
   label: t?.("product.height") ?? "Yükseklik",
   value: `${Number(product.heightCm)} cm`,
  });
 }

 if (labels.length > 0) return labels;

 if (product.dimensions) {
  return [{ key: "dimensions", label: null, value: product.dimensions }];
 }

 return [];
}

export function formatDimensions(product, t) {
 const labels = getDimensionLabels(product, t);

 if (labels.length > 0) {
  return labels
   .map((item) => (item.label ? `${item.label}: ${item.value}` : item.value))
   .join(" - ");
 }

 return null;
}

export function getVariantDimensions(product, t) {
 return formatDimensions(product, t) ?? "—";
}

export function getProductMoreInfo(product, t) {
 const paragraphs = [];

 if (product.description) {
  paragraphs.push(product.description);
 }

 if (product.collection?.description) {
  paragraphs.push(product.collection.description);
 }

 if (t) {
  paragraphs.push(t("product.moreInfoExtra1"));
  paragraphs.push(t("product.moreInfoExtra2"));
 }

 return paragraphs;
}
