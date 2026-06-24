import {
 getSitemapCategoryEntries,
 getSitemapSitelinkEntries,
} from "@/lib/seo/google-snippets";
import { getPublishedProductSlugs } from "@/lib/queries/products";

const STATIC_PAGES = [
 { path: "/", priority: 1, changeFrequency: "weekly" },
 { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" },
 { path: "/misyon-vizyon", priority: 0.7, changeFrequency: "monthly" },
 { path: "/sss", priority: 0.7, changeFrequency: "monthly" },
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

async function getSitemapProductEntries() {
 const slugs = await getPublishedProductSlugs();

 return slugs.map((slug) => ({
  path: `/urunler/${slug}`,
  priority: 0.7,
  changeFrequency: "weekly",
 }));
}

export async function getAllSitemapEntries() {
 const productEntries = await getSitemapProductEntries();

 return dedupeSitemapEntries([
  ...STATIC_PAGES,
  ...getSitemapSitelinkEntries(),
  ...getSitemapCategoryEntries(),
  ...productEntries,
 ]);
}
