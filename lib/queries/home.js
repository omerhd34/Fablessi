import { getLocale } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

async function fetchFeaturedProducts(locale) {
 const products = await prisma.product.findMany({
  where: { isPublished: true, isFeatured: true },
  orderBy: { featuredOrder: "asc" },
  take: 4,
  include: {
   collection: { select: { name: true, nameEn: true, slug: true } },
   images: {
    orderBy: { sortOrder: "asc" },
    take: 1,
    where: { isPrimary: true },
   },
  },
 });

 return products.map((product) => serializeProduct(product, locale));
}

export async function getHomePageData() {
 try {
  const locale = await getLocale();
  const featuredProducts = await fetchFeaturedProducts(locale);

  return { featuredProducts };
 } catch (error) {
  console.error("[getHomePageData]", error);
  return {
   featuredProducts: [],
  };
 }
}

