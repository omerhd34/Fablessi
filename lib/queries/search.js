import { localizeCollection } from "@/lib/i18n/localize-product";
import { getLocale } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";
import {
 buildCollectionSearchWhere,
 buildProductSearchWhere,
} from "@/lib/search-text";

const productSearchInclude = {
 collection: { select: { name: true, nameEn: true, slug: true } },
 images: {
  where: { isPrimary: true },
  take: 1,
  orderBy: { sortOrder: "asc" },
 },
};

export async function searchCatalog(query, { productLimit = 8 } = {}) {
 const trimmed = query.trim();
 if (!trimmed) {
  return { collections: [], products: [] };
 }

 try {
  const locale = await getLocale();
  const [collections, products] = await Promise.all([
   prisma.collection.findMany({
    where: buildCollectionSearchWhere(trimmed),
    take: 5,
    orderBy: { sortOrder: "asc" },
    select: {
     id: true,
     name: true,
     nameEn: true,
     slug: true,
     description: true,
     descriptionEn: true,
    },
   }),
   prisma.product.findMany({
    where: buildProductSearchWhere(trimmed),
    take: productLimit,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: productSearchInclude,
   }),
  ]);

  return {
   collections: collections.map((collection) =>
    localizeCollection(collection, locale)
   ),
   products: products.map((product) => serializeProduct(product, locale)),
  };
 } catch (error) {
  console.error("[searchCatalog]", error);
  return { collections: [], products: [] };
 }
}
