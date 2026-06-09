import { getServerDictionary } from "@/lib/i18n/server";

export function createPageMetadata(pageKey, options = {}) {
 const { descriptionKey = "description" } = options;

 return async function generateMetadata() {
  const { dictionary } = await getServerDictionary();
  const page = dictionary.pages[pageKey];

  return {
   title: page.title,
   description: page[descriptionKey],
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
