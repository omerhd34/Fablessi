import { prisma } from "@/lib/prisma";
import { resolveSiteUrl } from "@/lib/site-metadata";

const staticRoutes = [
 { path: "/", changeFrequency: "weekly", priority: 1 },
 { path: "/urunler", changeFrequency: "daily", priority: 0.9 },
 { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.7 },
 { path: "/misyon-vizyon", changeFrequency: "monthly", priority: 0.6 },
 { path: "/iletisim", changeFrequency: "monthly", priority: 0.8 },
 { path: "/sss", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap() {
 const baseUrl = resolveSiteUrl();

 let products = [];
 try {
  products = await prisma.product.findMany({
   where: { isPublished: true },
   select: { slug: true, updatedAt: true },
   orderBy: { updatedAt: "desc" },
  });
 } catch (error) {
  console.error("[sitemap]", error);
 }

 return [
  ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
   url: `${baseUrl}${path}`,
   lastModified: new Date(),
   changeFrequency,
   priority,
  })),
  ...products.map((product) => ({
   url: `${baseUrl}/urunler/${product.slug}`,
   lastModified: product.updatedAt,
   changeFrequency: "weekly",
   priority: 0.8,
  })),
 ];
}