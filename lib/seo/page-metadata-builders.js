import { buildSeoPageTitle, formatSeoTitle } from "@/lib/site-metadata";
import { getCatalogSeoConfig, getPageSeoConfig } from "@/lib/seo/pages";

export function buildPageSeoMetadata(pageKey, locale = "tr") {
 const config = getPageSeoConfig(pageKey, locale);
 if (!config) return null;

 if (config.absoluteTitle) {
  return {
   pageTitle: config.absoluteTitle,
   title: { absolute: config.absoluteTitle },
   openGraphTitle: config.absoluteTitle,
   description: config.description,
  };
 }

 return {
  pageTitle: config.pageTitle,
  title: buildSeoPageTitle(config.pageTitle),
  openGraphTitle: formatSeoTitle(config.pageTitle),
  description: config.description,
 };
}

export function buildCatalogSeoMetadata(categorySlug, locale = "tr") {
 const config = getCatalogSeoConfig(categorySlug, locale);

 return {
  pageTitle: config.pageTitle,
  metaTitle: config.metaTitle,
  title: { absolute: config.metaTitle },
  openGraphTitle: config.metaTitle,
  description: config.description,
 };
}
