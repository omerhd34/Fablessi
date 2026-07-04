import { buildPageSeoMetadata } from "@/lib/seo/page-metadata-builders";
import { buildSeoMetadataOutput } from "@/lib/seo/metadata-output";
import { pageSeoPaths } from "@/lib/seo/pages";
import { getServerDictionary } from "@/lib/i18n/server";
import {
 buildSeoPageTitle,
 buildSiteOpenGraph,
 formatSeoTitle,
 siteNameMetadata,
} from "@/lib/site-metadata";

export function createPageMetadata(pageKey, options = {}) {
 const { index = false } = options;

 return async function generateMetadata() {
  const { dictionary, locale } = await getServerDictionary();
  const page = dictionary.pages[pageKey];
  const seo = buildPageSeoMetadata(pageKey, locale);
  const path = pageSeoPaths[pageKey];

  if (!seo) {
   return {
    ...siteNameMetadata,
    robots: { index, follow: true },
   };
  }

  return buildSeoMetadataOutput({
   metaTitle: seo.metaTitle,
   description: seo.description,
   path,
   keywords: page?.keywords ?? dictionary.metadata.keywords,
   index,
  });
 };
}

export function createStatusMetadata(statusKey) {
 return async function generateMetadata() {
  const { dictionary } = await getServerDictionary();
  const metadata = dictionary.status[statusKey].metadata;
  const metaTitle = formatSeoTitle(metadata.title);

  return {
   ...siteNameMetadata,
   title: buildSeoPageTitle(metadata.title),
   description: metadata.description,
   openGraph: buildSiteOpenGraph({
    title: metaTitle,
    description: metadata.description,
   }),
  };
 };
}
