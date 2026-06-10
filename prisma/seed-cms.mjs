import { getDefaultContentBlocks, getDefaultFaqCategories } from "../lib/content/default-blocks.js";

export async function seedCms(prisma) {
 console.log("Site içerikleri ekleniyor…");

 await prisma.faqItem.deleteMany();
 await prisma.faqCategory.deleteMany();
 await prisma.contentBlock.deleteMany();

 const defaults = getDefaultContentBlocks();

 for (const [key, value] of Object.entries(defaults)) {
  await prisma.contentBlock.create({
   data: {
    key,
    contentTr: value.contentTr,
    contentEn: value.contentEn,
   },
  });
 }

 for (const category of getDefaultFaqCategories()) {
  const { items, ...data } = category;

  await prisma.faqCategory.create({
   data: {
    ...data,
    items: {
     create: items,
    },
   },
  });
 }

 console.log("  ✓ Site içerikleri yüklendi");
}
