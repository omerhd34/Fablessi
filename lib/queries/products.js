import { getLocale } from "@/lib/i18n/server";
import { getProductCategorySlugMap } from "@/lib/queries/category-groups";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const RELATED_PRODUCTS_LIMIT = 5;

const productListInclude = {
 categoryGroup: {
  select: { id: true, slug: true, name: true, nameEn: true },
 },
 images: { orderBy: { sortOrder: "asc" } },
};

const productDetailInclude = {
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
   orderBy: [{ name: "asc" }],
   include: productListInclude,
  });

  const serialized = products.map((product) => serializeProduct(product, locale));
  return serialized
   .sort((a, b) => a.name.localeCompare(b.name, locale === "tr" ? "tr-TR" : "en-US"))
   .slice(0, RELATED_PRODUCTS_LIMIT);
 } catch (error) {
  console.error("[getCategoryRelatedProducts]", error);
  return [];
 }
}

export async function getPublishedProductSlugs() {
 try {
  const products = await prisma.product.findMany({
   where: { isPublished: true },
   select: { slug: true },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return products.map((product) => product.slug);
 } catch (error) {
  console.error("[getPublishedProductSlugs]", error);
  return [];
 }
}

export async function getPublishedProducts(categorySlug = null) {
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
