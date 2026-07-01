import { buildPageSeoMetadata } from "@/lib/seo/page-metadata-builders";
import { getServerDictionary } from "@/lib/i18n/server";
import { buildSeoPageTitle, buildSiteOpenGraph, formatSeoTitle, siteNameMetadata } from "@/lib/site-metadata";

export function createPageMetadata(pageKey, options = {}) {
 const { index = false } = options;

 return async function generateMetadata() {
  const { dictionary, locale } = await getServerDictionary();
  const page = dictionary.pages[pageKey];
  const seo = buildPageSeoMetadata(pageKey, locale);

  if (!seo) {
   return {
    ...siteNameMetadata,
    robots: { index, follow: true },
   };
  }

  return {
   ...siteNameMetadata,
   title: seo.title,
   description: seo.description,
   openGraph: buildSiteOpenGraph({
    title: seo.openGraphTitle,
    description: seo.description,
   }),
   keywords: page?.keywords ?? dictionary.metadata.keywords,
   robots: {
    index,
    follow: true,
   },
  };
 };
}

export function createStatusMetadata(statusKey) {
 return async function generateMetadata() {
  const { dictionary } = await getServerDictionary();
  const metadata = dictionary.status[statusKey].metadata;

  return {
   ...siteNameMetadata,
   title: buildSeoPageTitle(metadata.title),
   description: metadata.description,
   openGraph: buildSiteOpenGraph({
    title: formatSeoTitle(metadata.title),
    description: metadata.description,
   }),
  };
 };
}
