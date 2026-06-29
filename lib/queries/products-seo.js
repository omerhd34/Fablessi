import { cache } from "react";
import { getLocale } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const seoProductInclude = {
 images: {
  orderBy: { sortOrder: "asc" },
  take: 1,
  where: { isPrimary: true },
 },
};

export const getProductsForSeo = cache(async function getProductsForSeo() {
 const locale = await getLocale();

 try {
  const products = await prisma.product.findMany({
   where: { isPublished: true },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: seoProductInclude,
  });

  return products.map((product) => serializeProduct(product, locale));
 } catch (error) {
  console.error("[getProductsForSeo]", error);
  return [];
 }
});
