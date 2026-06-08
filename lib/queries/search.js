import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const productSearchInclude = {
 collection: { select: { name: true, slug: true } },
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
  const [collections, products] = await Promise.all([
   prisma.collection.findMany({
    where: {
     isPublished: true,
     name: { contains: trimmed },
    },
    take: 5,
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, slug: true },
   }),
   prisma.product.findMany({
    where: {
     isPublished: true,
     OR: [
      { name: { contains: trimmed } },
      { slug: { contains: trimmed } },
      { collection: { name: { contains: trimmed } } },
     ],
    },
    take: productLimit,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: productSearchInclude,
   }),
  ]);

  return {
   collections,
   products: products.map(serializeProduct),
  };
 } catch (error) {
  console.error("[searchCatalog]", error);
  return { collections: [], products: [] };
 }
}
