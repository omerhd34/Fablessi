import { defaultLocale } from "@/lib/i18n/config";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { localizeProduct } from "@/lib/i18n/localize-product";
import { getCategoryLabelForProduct } from "@/lib/product-category";
import { getProductDefaultColorPrefix } from "@/lib/product-color-defaults";

export function getCollectionProductsHref(collectionSlug) {
 return `/urunler?koleksiyon=${collectionSlug}`;
}

export function getPrimaryImageUrl(product) {
 const images = product?.images ?? [];
 const primary = images.find((image) => image.isPrimary) ?? images[0];
 return primary?.url ?? null;
}

const IMAGE_COLOR_PREFIX_RE = /^(.+?)-\d+\.(jpe?g|png|webp)$/i;

function getImageFilename(url) {
 if (!url || typeof url !== "string") return null;

 try {
  const pathname = /^https?:\/\//i.test(url)
   ? new URL(url).pathname
   : url.startsWith("/")
    ? url
    : `/${url}`;

  return pathname.split("/").pop() ?? null;
 } catch {
  return url.split("/").pop() ?? null;
 }
}

export function getImageColorPrefix(url) {
 const filename = getImageFilename(url);
 if (!filename) return null;

 const match = filename.match(IMAGE_COLOR_PREFIX_RE);
 return match ? match[1].toLowerCase() : null;
}

export function getProductColorVariants(images, productSlug = null) {
 const groups = new Map();
 const unprefixedImages = [];

 for (const image of images ?? []) {
  const prefix = getImageColorPrefix(image.url);
  if (!prefix) {
   unprefixedImages.push(image);
   continue;
  }

  if (!groups.has(prefix)) {
   groups.set(prefix, []);
  }

  groups.get(prefix).push(image);
 }

 if (groups.size > 0) {
  return Array.from(groups.entries()).map(([prefix, variantImages]) => ({
   prefix,
   images: variantImages,
   previewUrl: variantImages[0]?.url ?? null,
  }));
 }

 const defaultPrefix = getProductDefaultColorPrefix(productSlug);
 if (defaultPrefix && unprefixedImages.length > 0) {
  return [
   {
    prefix: defaultPrefix,
    images: unprefixedImages,
    previewUrl: unprefixedImages[0]?.url ?? null,
   },
  ];
 }

 return null;
}

export function getDefaultColorPrefix(images, variants) {
 if (!variants?.length) return null;

 const primaryImage =
  images?.find((image) => image.isPrimary) ?? images?.[0] ?? null;
 const primaryPrefix = getImageColorPrefix(primaryImage?.url);

 if (primaryPrefix && variants.some((variant) => variant.prefix === primaryPrefix)) {
  return primaryPrefix;
 }

 return variants[0].prefix;
}

export function filterImagesByColorPrefix(images, prefix, productSlug = null) {
 if (!prefix) return images ?? [];

 const defaultPrefix = getProductDefaultColorPrefix(productSlug);

 return (images ?? []).filter((image) => {
  const imagePrefix = getImageColorPrefix(image.url);
  if (imagePrefix) return imagePrefix === prefix;
  return prefix === defaultPrefix;
 });
}

export function getColorVariantLabel(prefix, dictionary, t) {
 const fromDictionary = dictionary?.product?.colorVariants?.[prefix];
 if (fromDictionary) return fromDictionary;

 return t?.("product.colorVariantFallback", { color: prefix }) ?? prefix;
}

const COLOR_VARIANT_SWATCHES = {
 cappuccino: "#C8B49A",
 antrasit: "#2F353B",
 gri: "#9A9A9A",
};

export function getColorVariantSwatch(prefix) {
 return COLOR_VARIANT_SWATCHES[prefix?.toLowerCase()] ?? "#B8B8B8";
}

function attachProductImages(product) {
 if (!product) return product;

 return {
  ...product,
  images: [...(product.images ?? [])].sort(
   (left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0)
  ),
 };
}

function normalizeDimensionItem(item) {
 return {
  ...item,
  widthCm: item.widthCm != null ? Number(item.widthCm) : null,
  depthCm: item.depthCm != null ? Number(item.depthCm) : null,
  heightCm: item.heightCm != null ? Number(item.heightCm) : null,
  amount: item.amount != null ? Number(item.amount) : null,
  quantity: item.quantity != null ? Number(item.quantity) : null,
 };
}

export function getPriceItemQuantity(item) {
 const quantity = item?.quantity;

 if (quantity != null && quantity > 0) return quantity;

 return 1;
}

export function getPriceItemLineTotal(item) {
 if (item?.amount == null) return 0;

 return item.amount * getPriceItemQuantity(item);
}

const GROUPABLE_PRICE_ITEM_NAMES = new Set(["sandalye", "chair"]);

export function isGroupablePriceItem(item) {
 const name = item?.name?.trim().toLowerCase();
 const nameEn = item?.nameEn?.trim().toLowerCase();

 return (
  GROUPABLE_PRICE_ITEM_NAMES.has(name) || GROUPABLE_PRICE_ITEM_NAMES.has(nameEn)
 );
}

export function getPriceItemLabel(item) {
 const name = item?.name?.trim();

 if (!name) return null;

 const quantity = getPriceItemQuantity(item);

 if (isGroupablePriceItem(item) && quantity > 1) {
  return `${name} x ${quantity}`;
 }

 return name;
}

export function getPriceItemDisplayAmount(item) {
 if (isGroupablePriceItem(item) && getPriceItemQuantity(item) > 1) {
  return getPriceItemLineTotal(item);
 }

 return item?.amount ?? 0;
}

export function getDisplayPriceItems(items) {
 return items.flatMap((item, itemIndex) => {
  const quantity = getPriceItemQuantity(item);

  if (isGroupablePriceItem(item) && quantity > 1) {
   return [
    {
     ...item,
     _displayKey: `${item.name ?? "item"}-${itemIndex}-grouped`,
    },
   ];
  }

  return Array.from({ length: quantity }, (_, unitIndex) => ({
   ...item,
   quantity: 1,
   _displayKey: `${item.name ?? "item"}-${itemIndex}-${unitIndex}`,
  }));
 });
}

/** @deprecated Use getDisplayPriceItems instead */
export function expandItemsByQuantity(items) {
 return getDisplayPriceItems(items);
}

export function getDimensionItems(product) {
 if (Array.isArray(product?.dimensionItems) && product.dimensionItems.length > 0) {
  return product.dimensionItems.map(normalizeDimensionItem);
 }

 if (
  product?.widthCm != null ||
  product?.depthCm != null ||
  product?.heightCm != null
 ) {
  return [
   normalizeDimensionItem({
    widthCm: product.widthCm,
    depthCm: product.depthCm,
    heightCm: product.heightCm,
   }),
  ];
 }

 return [];
}

export function serializeProduct(product, locale = defaultLocale) {
 if (!product) return product;

 return localizeProduct(
  attachProductImages({
   ...product,
   widthCm: product.widthCm != null ? Number(product.widthCm) : null,
   heightCm: product.heightCm != null ? Number(product.heightCm) : null,
   depthCm: product.depthCm != null ? Number(product.depthCm) : null,
   dimensionItems: Array.isArray(product.dimensionItems)
    ? product.dimensionItems.map(normalizeDimensionItem)
    : product.dimensionItems,
  }),
  locale
 );
}

export function getProductCardLabel(product, dictionary) {
 const collectionName =
  getLocalizedCollectionName(product.collection, dictionary)?.trim() ??
  product.collection?.name?.trim();

 if (!collectionName) return product.name;

 const prefix = `${collectionName} `;
 if (product.name.startsWith(prefix)) {
  return product.name.slice(prefix.length).trim() || product.name;
 }

 return product.name;
}

export function getProductShortName(product, dictionary) {
 return (
  getLocalizedCollectionName(product.collection, dictionary) ??
  product.collection?.name ??
  product.name
 );
}

function capitalizeLabelWord(word, locale) {
 if (!word) return word;

 return word.charAt(0).toLocaleUpperCase(locale) + word.slice(1);
}

function capitalizeLabelSegment(segment, locale) {
 return segment
  .split(" ")
  .map((word) => capitalizeLabelWord(word, locale))
  .join(" ");
}

function formatProductCardSlashLabel(left, right, locale) {
 return `${capitalizeLabelSegment(left.trim(), locale)} / ${capitalizeLabelSegment(right.trim(), locale)}`;
}

export function formatProductCardBottomLabel(name, locale = defaultLocale) {
 const trimmed = name.trim();
 if (!trimmed) return "";

 const grupMatch = trimmed.match(/^(.+?)\s+((?:Oturma|Köşe|Masa)\s+Grubu)$/iu);
 if (grupMatch) {
  return formatProductCardSlashLabel(grupMatch[1], grupMatch[2], locale);
 }

 const words = trimmed.split(/\s+/);
 if (words.length === 2) {
  return formatProductCardSlashLabel(words[0], words[1], locale);
 }

 if (words.length > 2) {
  return formatProductCardSlashLabel(words[0], words.slice(1).join(" "), locale);
 }

 return capitalizeLabelSegment(trimmed, locale);
}

export function getProductCardBottomLabel(product, locale = defaultLocale) {
 const name = product.name?.trim();
 if (!name) return product.slug ?? "";

 return formatProductCardBottomLabel(name, locale);
}

export function getPriceItems(product) {
 return getDimensionItems(product).filter((item) => item.amount != null);
}

export function getProductPriceTotal(product) {
 const items = getPriceItems(product);

 if (items.length === 0) return null;

 return items.reduce((sum, item) => sum + getPriceItemLineTotal(item), 0);
}

export function getProductDisplayPrice(product) {
 return getProductPriceTotal(product) ?? product.displayPrice ?? null;
}

export function formatProductPrice(amount, locale = defaultLocale) {
 if (amount == null) return null;

 const { amount: formattedAmount, currency } = getFormattedProductPriceParts(
  amount,
  locale
 );

 return `${formattedAmount} ${currency}`;
}

export function getFormattedProductPriceParts(amount, locale = defaultLocale) {
 const formattedAmount = new Intl.NumberFormat(
  locale === "tr" ? "tr-TR" : "en-US",
  {
   maximumFractionDigits: 0,
  }
 ).format(amount);

 return { amount: formattedAmount, currency: "TL" };
}

export function getProductFavoriteToastLabel(product, dictionary) {
 const collectionName =
  getLocalizedCollectionName(product.collection, dictionary)?.trim() ??
  product.collection?.name?.trim();
 const categoryLabel = product?.slug
  ? getCategoryLabelForProduct(product, dictionary)
  : null;

 if (collectionName && categoryLabel) {
  return `${collectionName} - ${categoryLabel}`;
 }

 return collectionName ?? categoryLabel ?? product.name ?? null;
}

export function formatDimensions(product, t) {
 const items = getDimensionItems(product);

 if (items.length === 0) {
  return product.dimensions ?? null;
 }

 const widthLabel = t?.("product.dimensionWidthShort") ?? "G";
 const depthLabel = t?.("product.dimensionDepthShort") ?? "D";
 const heightLabel = t?.("product.dimensionHeightShort") ?? "Y";

 return items
  .map((item) => {
   const size = [item.widthCm, item.depthCm, item.heightCm]
    .filter((value) => value != null)
    .join(" x ");

   if (!size) return null;

   const sizeText = `${size} cm`;
   return item.name ? `${item.name}: ${sizeText}` : `${widthLabel} ${item.widthCm ?? "—"} · ${depthLabel} ${item.depthCm ?? "—"} · ${heightLabel} ${item.heightCm ?? "—"} cm`;
  })
  .filter(Boolean)
  .join(" · ");
}
