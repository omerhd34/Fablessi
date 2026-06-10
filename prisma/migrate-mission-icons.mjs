import { PrismaClient } from "@prisma/client";
import tr from "../lib/i18n/dictionaries/tr.js";
import en from "../lib/i18n/dictionaries/en.js";

const LEGACY = {
 quality: "MdVerifiedUser",
 design: "MdViewModule",
 transparency: "MdExplore",
 customer: "MdSupportAgent",
 partnership: "MdHandshake",
};

function syncValueIcons(content, defaults) {
 if (!content?.values?.length || !defaults?.values?.length) {
  return { content, changed: false };
 }

 let changed = false;
 const values = content.values.map((value, index) => {
  const fromLegacy = LEGACY[value.icon];
  const fromDefault = defaults.values[index]?.icon;
  const next = fromLegacy ?? fromDefault ?? value.icon;

  if (next !== value.icon) changed = true;
  return { ...value, icon: next };
 });

 return { content: { ...content, values }, changed };
}

const prisma = new PrismaClient();
const block = await prisma.contentBlock.findUnique({ where: { key: "missionVision" } });

if (!block) {
 console.log("missionVision bloğu bulunamadı.");
} else {
 const trResult = syncValueIcons(block.contentTr, tr.missionVision);
 const enResult = syncValueIcons(block.contentEn, en.missionVision);

 if (!trResult.changed && !enResult.changed) {
  console.log("İkonlar zaten güncel.");
 } else {
  await prisma.contentBlock.update({
   where: { key: "missionVision" },
   data: { contentTr: trResult.content, contentEn: enResult.content },
  });
  console.log("İkonlar güncellendi:", trResult.content.values.map((v) => v.icon));
 }
}

await prisma.$disconnect();
