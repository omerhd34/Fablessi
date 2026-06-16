import { PrismaClient } from "@prisma/client";
import tr from "../lib/i18n/dictionaries/tr.js";
import en from "../lib/i18n/dictionaries/en.js";

const prisma = new PrismaClient();
const block = await prisma.contentBlock.findUnique({ where: { key: "missionVision" } });

if (!block) {
 console.log("missionVision bloğu bulunamadı.");
} else {
 const sixthTr = tr.missionVision.values[5];
 const sixthEn = en.missionVision.values[5];
 let changed = false;

 const contentTr = { ...block.contentTr };
 const contentEn = { ...block.contentEn };

 if ((contentTr.values?.length ?? 0) < 6) {
  contentTr.values = [...(contentTr.values ?? []), sixthTr];
  changed = true;
 }

 if ((contentEn.values?.length ?? 0) < 6) {
  contentEn.values = [...(contentEn.values ?? []), sixthEn];
  changed = true;
 }

 if (!changed) {
  console.log("Değerler zaten 6 adet.");
 } else {
  await prisma.contentBlock.update({
   where: { key: "missionVision" },
   data: { contentTr, contentEn },
  });
  console.log("6. değer eklendi:", sixthTr.title);
 }
}

await prisma.$disconnect();
