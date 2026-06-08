import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

async function fetchCollections() {
 const collections = await prisma.collection.findMany({
  where: { isPublished: true },
  orderBy: { sortOrder: "asc" },
  include: {
   _count: { select: { products: true } },
   products: {
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    take: 1,
    include: {
     images: {
      where: { isPrimary: true },
      take: 1,
     },
    },
   },
  },
 });

 return collections.map((collection) => ({
  ...collection,
  products: collection.products.map(serializeProduct),
 }));
}

async function fetchFeaturedProducts() {
 const products = await prisma.product.findMany({
  where: { isPublished: true, isFeatured: true },
  orderBy: { featuredOrder: "asc" },
  take: 4,
  include: {
   collection: { select: { name: true, slug: true } },
   images: {
    orderBy: { sortOrder: "asc" },
    take: 1,
    where: { isPrimary: true },
   },
  },
 });

 return products.map(serializeProduct);
}

async function fetchArchitectPicks() {
 const products = await prisma.product.findMany({
  where: { isPublished: true },
  orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  take: 8,
  include: {
   collection: { select: { name: true, slug: true } },
   images: {
    orderBy: { sortOrder: "asc" },
    take: 1,
    where: { isPrimary: true },
   },
  },
 });

 return products.map(serializeProduct);
}

export async function getHomePageData() {
 try {
  const [collections, featuredProducts, architectPicks] = await Promise.all([
   fetchCollections(),
   fetchFeaturedProducts(),
   fetchArchitectPicks(),
  ]);

  return { collections, featuredProducts, architectPicks };
 } catch (error) {
  console.error("[getHomePageData]", error);
  return {
   collections: [],
   featuredProducts: [],
   architectPicks: [],
  };
 }
}

export function getPrimaryImageUrl(product) {
 return product.images?.[0]?.url ?? null;
}
