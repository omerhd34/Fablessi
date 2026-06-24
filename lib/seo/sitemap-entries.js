import {
 getSitemapCategoryEntries,
 getSitemapSitelinkEntries,
} from "@/lib/seo/google-snippets";
import {
 getPublishedCollectionSlugs,
 getPublishedProductSlugs,
} from "@/lib/queries/products";

const STATIC_PAGES = [
 { path: "/", priority: 1, changeFrequency: "weekly" },
];

export function buildSitemapUrl(baseUrl, path) {
 if (path === "/") return baseUrl;
 return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function dedupeSitemapEntries(entries) {
 const seen = new Set();
 return entries.filter((entry) => {
  if (seen.has(entry.path)) return false;
  seen.add(entry.path);
  return true;
 });
}

async function getSitemapCollectionEntries() {
 const slugs = await getPublishedCollectionSlugs();

 return slugs.map((slug) => ({
  path: `/urunler?koleksiyon=${slug}`,
  priority: 0.75,
  changeFrequency: "weekly",
 }));
}

async function getSitemapProductEntries() {
 const slugs = await getPublishedProductSlugs();

 return slugs.map((slug) => ({
  path: `/urunler/${slug}`,
  priority: 0.7,
  changeFrequency: "weekly",
 }));
}

export async function getAllSitemapEntries() {
 const [collectionEntries, productEntries] = await Promise.all([
  getSitemapCollectionEntries(),
  getSitemapProductEntries(),
 ]);

 return dedupeSitemapEntries([
  ...STATIC_PAGES,
  ...getSitemapSitelinkEntries(),
  ...getSitemapCategoryEntries(),
  ...collectionEntries,
  ...productEntries,
 ]);
}
