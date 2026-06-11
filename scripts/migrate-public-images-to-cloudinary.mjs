import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { PrismaClient } from "@prisma/client";
import { uploadImageBuffer, uploadImageFile } from "../lib/cloudinary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const MAP_PATH = path.join(ROOT, "lib", "media", "cloudinary-url-map.json");
const FOLDERS_PATH = path.join(ROOT, "lib", "media", "product-folders.json");

const SOURCE_FILES_TO_PATCH = [
 "lib/i18n/navigation-data.js",
 "lib/faq.js",
 "components/about/about-page-content.jsx",
 "components/mission/mission-page-content.jsx",
 "components/home/brand-experience-banner.jsx",
];

const IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;
const MAX_UPLOAD_BYTES = 9.5 * 1024 * 1024;

function loadEnvFile() {
 const envPath = path.join(ROOT, ".env");
 if (!fsSync.existsSync(envPath)) return Promise.resolve();

 return fs.readFile(envPath, "utf8").then((content) => {
  for (const line of content.split("\n")) {
   const trimmed = line.trim();
   if (!trimmed || trimmed.startsWith("#")) continue;

   const separator = trimmed.indexOf("=");
   if (separator === -1) continue;

   const key = trimmed.slice(0, separator).trim();
   let value = trimmed.slice(separator + 1).trim();

   if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
   ) {
    value = value.slice(1, -1);
   }

   if (!(key in process.env)) {
    process.env[key] = value;
   }
  }
 });
}

function toPublicId(filename) {
 return path.basename(filename, path.extname(filename)).replace(/[^a-zA-Z0-9._-]/g, "-");
}

function toLocalUrl(folder, filename) {
 return `/${folder}/${filename}`;
}

async function readJson(filePath) {
 return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function collectProductImages(folders) {
 const files = [];

 for (const folder of folders) {
  const dir = path.join(PUBLIC_DIR, folder);

  try {
   const entries = await fs.readdir(dir, { withFileTypes: true });

   for (const entry of entries) {
    if (!entry.isFile() || !IMAGE_PATTERN.test(entry.name)) continue;

    files.push({
     folder,
     filename: entry.name,
     filePath: path.join(dir, entry.name),
     localUrl: toLocalUrl(folder, entry.name),
    });
   }
  } catch (error) {
   if (error.code === "ENOENT") {
    console.warn(`  ⚠ Klasör bulunamadı, atlanıyor: ${folder}`);
    continue;
   }

   throw error;
  }
 }

 return files.sort((left, right) => left.localUrl.localeCompare(right.localUrl));
}

async function compressForUpload(filePath) {
 let buffer = await sharp(filePath)
  .rotate()
  .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

 if (buffer.length <= MAX_UPLOAD_BYTES) {
  return buffer;
 }

 for (const quality of [72, 62, 52]) {
  buffer = await sharp(filePath)
   .rotate()
   .resize({ width: 2048, height: 2048, fit: "inside", withoutEnlargement: true })
   .jpeg({ quality, mozjpeg: true })
   .toBuffer();

  if (buffer.length <= MAX_UPLOAD_BYTES) {
   return buffer;
  }
 }

 throw new Error(
  `Sıkıştırma sonrası hâlâ çok büyük (${Math.round(buffer.length / 1024 / 1024)} MB): ${filePath}`
 );
}

async function uploadProductImage(file) {
 const stat = await fs.stat(file.filePath);
 const publicId = toPublicId(file.filename);

 if (stat.size <= MAX_UPLOAD_BYTES) {
  return uploadImageFile(file.filePath, {
   folder: file.folder,
   publicId,
  });
 }

 console.log(
  `  ↳ Sıkıştırılıyor (${Math.round(stat.size / 1024 / 1024)} MB → ≤10 MB): ${file.localUrl}`
 );

 const buffer = await compressForUpload(file.filePath);

 return uploadImageBuffer(buffer, {
  folder: file.folder,
  publicId,
 });
}

async function uploadImages(files, existingMap, dryRun) {
 const map = { ...existingMap };
 let uploaded = 0;
 let skipped = 0;

 for (const [index, file] of files.entries()) {
  if (map[file.localUrl]) {
   skipped += 1;
   console.log(`  ↷ Zaten yüklü (${index + 1}/${files.length}): ${file.localUrl}`);
   continue;
  }

  if (dryRun) {
   console.log(`  [dry-run] Yüklenecek: ${file.localUrl}`);
   continue;
  }

  const result = await uploadProductImage(file);

  map[file.localUrl] = result.secure_url;
  uploaded += 1;
  console.log(`  ✓ (${index + 1}/${files.length}) ${file.localUrl}`);
 }

 return { map, uploaded, skipped };
}

async function updateDatabase(prisma, map, dryRun) {
 const localUrls = Object.keys(map);
 if (localUrls.length === 0) return { images: 0, collections: 0, categoryGroups: 0 };

 if (dryRun) {
  console.log("\n[dry-run] Veritabanı güncellemesi atlandı.");
  return { images: 0, collections: 0, categoryGroups: 0 };
 }

 let images = 0;
 let collections = 0;
 let categoryGroups = 0;

 for (const [localUrl, cloudinaryUrl] of Object.entries(map)) {
  const imageResult = await prisma.image.updateMany({
   where: { url: localUrl },
   data: { url: cloudinaryUrl },
  });
  images += imageResult.count;

  const collectionResult = await prisma.collection.updateMany({
   where: { coverImage: localUrl },
   data: { coverImage: cloudinaryUrl },
  });
  collections += collectionResult.count;

  const groupResult = await prisma.productCategoryGroup.updateMany({
   where: { coverImage: localUrl },
   data: { coverImage: cloudinaryUrl },
  });
  categoryGroups += groupResult.count;
 }

 return { images, collections, categoryGroups };
}

async function patchSourceFiles(map, dryRun) {
 let replacements = 0;

 for (const relativePath of SOURCE_FILES_TO_PATCH) {
  const filePath = path.join(ROOT, relativePath);
  let content = await fs.readFile(filePath, "utf8");
  let fileReplacements = 0;

  for (const [localUrl, cloudinaryUrl] of Object.entries(map)) {
   const before = content;
   content = content.split(localUrl).join(cloudinaryUrl);
   if (content !== before) fileReplacements += 1;
  }

  if (fileReplacements > 0 && !dryRun) {
   await fs.writeFile(filePath, content, "utf8");
  }

  if (fileReplacements > 0) {
   console.log(`  ✓ ${relativePath} (${fileReplacements} yol güncellendi)`);
  }

  replacements += fileReplacements;
 }

 return replacements;
}

async function main() {
 const dryRun = process.argv.includes("--dry-run");

 await loadEnvFile();

 const folders = await readJson(FOLDERS_PATH);
 const existingMap = await readJson(MAP_PATH).catch(() => ({}));
 const files = await collectProductImages(folders);

 console.log(`\n${dryRun ? "[dry-run] " : ""}Cloudinary'ye ${files.length} ürün görseli yüklenecek.\n`);

 const { map, uploaded, skipped } = await uploadImages(files, existingMap, dryRun);

 if (!dryRun) {
  await fs.writeFile(MAP_PATH, `${JSON.stringify(map, null, 2)}\n`, "utf8");
  console.log(`\nURL eşlemesi kaydedildi: lib/media/cloudinary-url-map.json`);
 }

 const prisma = new PrismaClient();

 try {
  const dbStats = await updateDatabase(prisma, map, dryRun);
  const fileStats = await patchSourceFiles(map, dryRun);

  console.log("\nÖzet:");
  console.log(`  Yüklenen görsel: ${uploaded}`);
  console.log(`  Atlanan (zaten map'te): ${skipped}`);
  console.log(`  DB Image kaydı: ${dbStats.images}`);
  console.log(`  DB Collection kapak: ${dbStats.collections}`);
  console.log(`  DB Kategori grubu kapak: ${dbStats.categoryGroups}`);
  console.log(`  Kaynak dosya güncellemesi: ${fileStats}`);

  if (dryRun) {
   console.log("\nGerçek yükleme için: npm run media:migrate:cloudinary");
  } else {
   console.log("\nTamamlandı. public/ ürün klasörlerini silmeden önce siteyi kontrol edin.");
  }
 } finally {
  await prisma.$disconnect();
 }
}

main().catch((error) => {
 console.error("\nMigrasyon hatası:", error);
 process.exit(1);
});
