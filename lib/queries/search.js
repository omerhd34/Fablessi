import { getLocale } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";
import { buildProductSearchWhere } from "@/lib/search-text";

const productSearchInclude = {
 categoryGroup: { select: { name: true, nameEn: true, slug: true } },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function searchCatalog(query, { productLimit = 8 } = {}) {
 const trimmed = query.trim();
 if (!trimmed) {
  return { products: [] };
 }

 try {
  const locale = await getLocale();
  const products = await prisma.product.findMany({
   where: buildProductSearchWhere(trimmed),
   take: productLimit,
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: productSearchInclude,
  });

  return {
   products: products.map((product) => serializeProduct(product, locale)),
  };
 } catch (error) {
  console.error("[searchCatalog]", error);
  return { products: [] };
 }
}
