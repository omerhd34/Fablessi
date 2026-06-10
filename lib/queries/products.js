import { localizeCollection } from "@/lib/i18n/localize-product";
import { getLocale } from "@/lib/i18n/server";
import { getProductCategorySlugMap } from "@/lib/queries/category-groups";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const variantWithImagesInclude = {
 orderBy: { sortOrder: "asc" },
 include: {
  images: { orderBy: { sortOrder: "asc" } },
 },
};

const productListInclude = {
 collection: {
  select: { name: true, nameEn: true, slug: true },
 },
 categoryGroup: {
  select: { id: true, slug: true, name: true, nameEn: true },
 },
 variants: variantWithImagesInclude,
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
 variants: variantWithImagesInclude,
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

  return products.map((product) => serializeProduct(product, locale));
 } catch (error) {
  console.error("[getCategoryRelatedProducts]", error);
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
