import { productMenuGroupsData } from "@/lib/i18n/navigation-data";
import { prisma } from "@/lib/prisma";

const STATIC_PAGES = [
 { path: "/", priority: 1, changeFrequency: "weekly" },
 { path: "/urunler", priority: 0.9, changeFrequency: "daily" },
 { path: "/iletisim", priority: 0.8, changeFrequency: "monthly" },
 { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" },
 { path: "/misyon-vizyon", priority: 0.7, changeFrequency: "monthly" },
 { path: "/sss", priority: 0.7, changeFrequency: "monthly" },
 { path: "/gizlilik-politikasi", priority: 0.3, changeFrequency: "yearly" },
 { path: "/kvkk", priority: 0.3, changeFrequency: "yearly" },
 { path: "/cerez-politikasi", priority: 0.3, changeFrequency: "yearly" },
];

function getCategorySitemapEntries() {
 return productMenuGroupsData.map((group) => ({
  path: `/urunler?kategori=${group.slug}`,
  priority: 0.8,
  changeFrequency: "weekly",
 }));
}

export function buildSitemapUrl(baseUrl, path) {
 if (path === "/") return baseUrl;
 return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function mergeSitemapEntry(existing, incoming) {
 if (!existing) return incoming;

 return {
  ...existing,
  priority: Math.max(existing.priority, incoming.priority),
  lastModified:
   existing.lastModified && incoming.lastModified
    ? existing.lastModified > incoming.lastModified
     ? existing.lastModified
     : incoming.lastModified
    : existing.lastModified ?? incoming.lastModified,
 };
}

export async function getAllSitemapEntries() {
 const entriesByPath = new Map();

 for (const entry of [...STATIC_PAGES, ...getCategorySitemapEntries()]) {
  entriesByPath.set(entry.path, entry);
 }

 try {
  const [collections, products, categoryGroups] = await Promise.all([
   prisma.collection.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   }),
   prisma.product.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   }),
   prisma.productCategoryGroup.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   }),
  ]);

  for (const category of categoryGroups) {
   const path = `/urunler?kategori=${category.slug}`;
   const entry = {
    path,
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: category.updatedAt,
   };
   entriesByPath.set(path, mergeSitemapEntry(entriesByPath.get(path), entry));
  }

  for (const collection of collections) {
   const path = `/urunler?koleksiyon=${collection.slug}`;
   entriesByPath.set(path, {
    path,
    priority: 0.75,
    changeFrequency: "weekly",
    lastModified: collection.updatedAt,
   });
  }

  for (const product of products) {
   const path = `/urunler/${product.slug}`;
   entriesByPath.set(path, {
    path,
    priority: 0.7,
    changeFrequency: "weekly",
    lastModified: product.updatedAt,
   });
  }
 } catch (error) {
  console.error("[getAllSitemapEntries]", error);
 }

 return [...entriesByPath.values()].sort((a, b) => b.priority - a.priority);
}

/** @deprecated use getAllSitemapEntries */
export function getSitelinkSitemapEntries() {
 return [...STATIC_PAGES, ...getCategorySitemapEntries()];
}
