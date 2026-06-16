import { getGooglePageDescription } from "@/lib/seo/google-snippets";
import { getServerDictionary } from "@/lib/i18n/server";

export function createPageMetadata(pageKey, options = {}) {
 const { descriptionKey = "description", index = false } = options;

 return async function generateMetadata() {
  const { dictionary, locale } = await getServerDictionary();
  const page = dictionary.pages[pageKey];
  const googleDescription = getGooglePageDescription(pageKey, locale);

  return {
   title: page.title,
   description: googleDescription ?? page[descriptionKey],
   keywords: page.keywords ?? dictionary.metadata.keywords,
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
   title: metadata.title,
   description: metadata.description,
  };
 };
}
