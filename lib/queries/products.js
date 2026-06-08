import { localizeCollection } from "@/lib/i18n/localize-product";
import { getLocale } from "@/lib/i18n/server";
import { productCategorySlugs } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const productListInclude = {
 collection: {
  select: { name: true, nameEn: true, slug: true, description: true, descriptionEn: true },
 },
 variants: {
  select: { color: true, material: true, isDefault: true },
  orderBy: { sortOrder: "asc" },
 },
 images: {
  where: { isPrimary: true },
  take: 1,
  orderBy: { sortOrder: "asc" },
 },
};

const productDetailInclude = {
 collection: {
  select: {
   name: true,
   nameEn: true,
   slug: true,
   description: true,
   descriptionEn: true,
  },
 },
 variants: { orderBy: { sortOrder: "asc" } },
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
 const categorySlug = Object.keys(productCategorySlugs).find((slug) =>
  productCategorySlugs[slug].includes(productSlug)
 );

 if (!categorySlug) return [];

 const relatedSlugs = productCategorySlugs[categorySlug].filter(
  (slug) => slug !== productSlug
 );

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
    description: true,
    descriptionEn: true,
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
 const slugs =
  categorySlug && productCategorySlugs[categorySlug]
   ? productCategorySlugs[categorySlug]
   : null;

 try {
  const locale = await getLocale();
  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    ...(slugs?.length ? { slug: { in: slugs } } : {}),
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
