import { localizeCollection } from "@/lib/i18n/localize-product";
import { getLocale } from "@/lib/i18n/server";
import { getProductCategorySlugMap } from "@/lib/queries/category-groups";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const RELATED_PRODUCTS_LIMIT = 5;

function shuffleArray(items) {
 const shuffled = [...items];
 for (let i = shuffled.length - 1; i > 0; i -= 1) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
 }
 return shuffled;
}

function pickRandomItems(items, limit) {
 return shuffleArray(items).slice(0, limit);
}

const productListInclude = {
 collection: {
  select: { name: true, nameEn: true, slug: true },
 },
 categoryGroup: {
  select: { id: true, slug: true, name: true, nameEn: true },
 },
 images: { orderBy: { sortOrder: "asc" } },
};

const productDetailInclude = {
 collection: {
  select: {
   name: true,
   nameEn: true,
   slug: true,
  },
 },
 categoryGroup: {
  select: { id: true, slug: true, name: true, nameEn: true },
 },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function getProductBySlug(slug) {
 try {
  const locale = await getLocale();
  const product = await prisma.product.findFirst({
   where: { slug, isPublished: true },
   include: productDetailInclude,
  });

  return serializeProduct(product, locale);
 } catch (error) {
  console.error("[getProductBySlug]", error);
  return null;
 }
}

export async function getCategoryRelatedProducts(productSlug) {
 const categoryMap = await getProductCategorySlugMap();
 const categorySlug = Object.keys(categoryMap).find((slug) =>
  categoryMap[slug].includes(productSlug)
 );

 if (!categorySlug) return [];

 const relatedSlugs = categoryMap[categorySlug].filter((slug) => slug !== productSlug);

 if (!relatedSlugs.length) return [];

 try {
  const locale = await getLocale();
  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    slug: { in: relatedSlugs },
   },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: productListInclude,
  });

  return pickRandomItems(
   products.map((product) => serializeProduct(product, locale)),
   RELATED_PRODUCTS_LIMIT
  );
 } catch (error) {
  console.error("[getCategoryRelatedProducts]", error);
  return [];
 }
}

export async function getCollectionRelatedProducts(productSlug) {
 try {
  const locale = await getLocale();
  const current = await prisma.product.findFirst({
   where: { slug: productSlug, isPublished: true },
   select: { collectionId: true },
  });

  if (!current?.collectionId) return [];

  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    collectionId: current.collectionId,
    slug: { not: productSlug },
   },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: productListInclude,
  });

  return pickRandomItems(
   products.map((product) => serializeProduct(product, locale)),
   RELATED_PRODUCTS_LIMIT
  );
 } catch (error) {
  console.error("[getCollectionRelatedProducts]", error);
  return [];
 }
}

export async function getCollectionBySlug(slug) {
 if (!slug) return null;

 try {
  const locale = await getLocale();
  const collection = await prisma.collection.findFirst({
   where: { slug, isPublished: true },
   select: {
    name: true,
    nameEn: true,
    slug: true,
   },
  });

  return collection ? localizeCollection(collection, locale) : null;
 } catch (error) {
  console.error("[getCollectionBySlug]", error);
  return null;
 }
}

export async function getPublishedProducts(
 categorySlug = null,
 collectionSlug = null
) {
 const categoryMap = await getProductCategorySlugMap();
 const slugs =
  categorySlug && categoryMap[categorySlug] ? categoryMap[categorySlug] : null;

 try {
  const locale = await getLocale();
  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    ...(categorySlug
     ? slugs?.length
      ? { slug: { in: slugs } }
      : { categoryGroup: { slug: categorySlug, isPublished: true } }
     : {}),
    ...(collectionSlug
     ? { collection: { slug: collectionSlug, isPublished: true } }
     : {}),
   },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: productListInclude,
  });

  return products.map((product) => serializeProduct(product, locale));
 } catch (error) {
  console.error("[getPublishedProducts]", error);
  return [];
 }
}
