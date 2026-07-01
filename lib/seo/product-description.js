import { buildSeoPageTitle, formatSeoTitle } from "@/lib/site-metadata";

/** @param {{ name?: string | null, nameEn?: string | null, locale?: string }} */
export function resolveProductSeoName({ name, nameEn, locale = "tr" }) {
 if (locale === "en") return nameEn?.trim() || name?.trim() || null;
 return name?.trim() || null;
}

/**
 * Ürün sayfası meta açıklaması (Google C).
 * Şablon: İnegöl üretimi premium bahçe ve balkon mobilyası olan {ürün adı}. Ölçüler, renk seçenekleri ve detayları inceleyin.
 */
export function buildProductSeoDescription({ name, nameEn, locale = "tr" }) {
 const productName = resolveProductSeoName({ name, nameEn, locale });
 if (!productName) return null;

 if (locale === "en") {
  return `${productName}, premium garden and balcony furniture made in İnegöl. View dimensions, color options and details.`;
 }

 return `İnegöl üretimi premium bahçe ve balkon mobilyası olan ${productName}. Ölçüler, renk seçenekleri ve detayları inceleyin.`;
}

/**
 * Ürün sayfası SEO metadata (Google B + C).
 * B şablonu: {ürün adı} | Fablessi Outdoor Living
 */
export function buildProductSeoMetadata({ name, nameEn, locale = "tr" }) {
 const productName = resolveProductSeoName({ name, nameEn, locale });
 if (!productName) {
  return { pageTitle: null, title: null, openGraphTitle: null, description: null };
 }

 const description = buildProductSeoDescription({ name, nameEn, locale });

 return {
  pageTitle: productName,
  title: buildSeoPageTitle(productName),
  openGraphTitle: formatSeoTitle(productName),
  description,
 };
}
