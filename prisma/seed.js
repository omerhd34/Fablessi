const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const IMAGES = {
 heroInterior:
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
 sofa: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
 sofa2: "https://images.unsplash.com/photo-1493663284031-b7e3aeddfe6b?w=1200&q=80",
 chair: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80",
 table: "https://images.unsplash.com/photo-1617806112203-f22f42ae3a72?w=1200&q=80",
 console: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
 modular: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
 daybed: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
 armchair: "https://images.unsplash.com/photo-1540574163026-d789eea30a08?w=1200&q=80",
 sideTable: "https://images.unsplash.com/photo-1532372320902-9d56224118ef?w=1200&q=80",
 dining: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
 sunbed: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
 outdoor: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
 bench: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
 marble: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80",
};

const COLLECTIONS = [
 {
  slug: "marmor-series",
  name: "Marmor Series",
  description:
   "Mermer yüzey detayları ve keskin geometri ile tanımlanan premium oturma koleksiyonu.",
  coverImage: IMAGES.marble,
  sortOrder: 1,
  products: [
   {
    slug: "marmor-kanepe",
    name: "Marmor Kanepe",
    description:
     "İtalyan mermer ayaklı, geniş oturum derinliğine sahip üçlü kanepe. Salon ve lobi alanları için ideal.",
    dimensions: "280 x 95 x 72 cm",
    widthCm: 280,
    heightCm: 72,
    depthCm: 95,
    sortOrder: 1,
    image: IMAGES.sofa,
    variants: [
     { name: "Travertin / Krem", color: "Krem", material: "Travertin", isDefault: true },
     { name: "Nero / Antrasit", color: "Antrasit", material: "Mermer Nero" },
    ],
   },
   {
    slug: "marmor-berjer",
    name: "Marmor Berjer",
    description:
     "Ergonomik sırt desteği ve mermer kol dayama ile tamamlanan tekli berjer.",
    dimensions: "78 x 82 x 75 cm",
    widthCm: 78,
    heightCm: 75,
    depthCm: 82,
    sortOrder: 2,
    image: IMAGES.chair,
    variants: [
     { name: "Krem Deri", color: "Krem", material: "Deri", isDefault: true },
    ],
   },
   {
    slug: "marmor-sehpa",
    name: "Marmor Orta Sehpa",
    description:
     "Doğal mermer tabla ve mat siyah metal gövde. Modüler yan sehpalarla kombinlenebilir.",
    dimensions: "120 x 38 x 60 cm",
    widthCm: 120,
    heightCm: 38,
    depthCm: 60,
    sortOrder: 3,
    image: IMAGES.table,
    variants: [
     { name: "Calacatta", material: "Mermer Calacatta", isDefault: true },
     { name: "Emperador", material: "Mermer Emperador" },
    ],
   },
   {
    slug: "marmor-konsol",
    name: "Marmor Konsol",
    description:
     "Giriş holü ve yemek odası duvarları için ince profilli konsol ünitesi.",
    dimensions: "160 x 85 x 40 cm",
    widthCm: 160,
    heightCm: 85,
    depthCm: 40,
    sortOrder: 4,
    image: IMAGES.console,
    variants: [
     { name: "Meşe / Mermer", material: "Meşe & Mermer", isDefault: true },
    ],
   },
  ],
 },
 {
  slug: "lounge",
  name: "Lounge",
  description:
   "İç mekân konforunu ön planda tutan modüler oturma ve dinlenme parçaları.",
  coverImage: IMAGES.modular,
  sortOrder: 2,
  products: [
   {
    slug: "lounge-moduler-kose",
    name: "Lounge Modüler Köşe",
    description:
     "Yapılandırılabilir modüller ile L ve U form oturma düzenleri oluşturulabilir.",
    dimensions: "320 x 88 x 160 cm",
    widthCm: 320,
    heightCm: 88,
    depthCm: 160,
    sortOrder: 1,
    image: IMAGES.modular,
    variants: [
     { name: "Kum Beji", color: "Bej", material: "Keten", isDefault: true },
     { name: "Antrasit", color: "Antrasit", material: "Kadife" },
    ],
   },
   {
    slug: "lounge-divan",
    name: "Lounge Divan",
    description:
     "Geniş oturum alanı sunan, düşük profilli divan. Yatak odası ve salon için uygundur.",
    dimensions: "200 x 45 x 90 cm",
    widthCm: 200,
    heightCm: 45,
    depthCm: 90,
    sortOrder: 2,
    image: IMAGES.daybed,
    variants: [
     { name: "Taupe", color: "Taupe", material: "Yün karışım", isDefault: true },
    ],
   },
   {
    slug: "lounge-kol-koltuk",
    name: "Lounge Kol Koltuk",
    description:
     "Yumuşak hatlı kol koltuk; okuma köşeleri ve suit otel lobileri için tasarlandı.",
    dimensions: "90 x 78 x 82 cm",
    widthCm: 90,
    heightCm: 82,
    depthCm: 78,
    sortOrder: 3,
    image: IMAGES.armchair,
    variants: [
     { name: "Vizon", color: "Vizon", material: "Mikrofiber", isDefault: true },
    ],
   },
   {
    slug: "lounge-yan-sehpa",
    name: "Lounge Yan Sehpa",
    description:
     "İnce metal ayaklı, ahşap tablalı yan sehpa seti (2'li).",
    dimensions: "45 x 50 x 45 cm",
    widthCm: 45,
    heightCm: 50,
    depthCm: 45,
    sortOrder: 4,
    image: IMAGES.sideTable,
    variants: [
     { name: "Ceviz", material: "Ceviz kaplama", isDefault: true },
    ],
   },
  ],
 },
 {
  slug: "garden",
  name: "Garden",
  description:
   "Hava koşullarına dayanıklı malzemelerle üretilmiş dış mekân mobilya koleksiyonu.",
  coverImage: IMAGES.outdoor,
  sortOrder: 3,
  products: [
   {
    slug: "garden-yemek-takimi",
    name: "Garden Yemek Takımı",
    description:
     "6 kişilik dış mekân yemek masası ve sandalye seti. UV dayanımlı örgü dokuma.",
    dimensions: "Masa: 220 x 75 x 100 cm",
    widthCm: 220,
    heightCm: 75,
    depthCm: 100,
    sortOrder: 1,
    image: IMAGES.dining,
    variants: [
     { name: "Teak / Antrasit", material: "Teak & Alüminyum", isDefault: true },
    ],
   },
   {
    slug: "garden-sedir",
    name: "Garden Şezlong",
    description:
     "Ayarlanabilir sırtlı şezlong; havuz kenarı ve teras kullanımı için.",
    dimensions: "200 x 35 x 70 cm",
    widthCm: 200,
    heightCm: 35,
    depthCm: 70,
    sortOrder: 2,
    image: IMAGES.sunbed,
    variants: [
     { name: "Beyaz", color: "Beyaz", material: "Alüminyum", isDefault: true },
    ],
   },
   {
    slug: "garden-oturma-grubu",
    name: "Garden Oturma Grubu",
    description:
     "Modüler dış mekân koltuk, sehpa ve puf kombinasyonu. All-weather kumaş kaplama.",
    dimensions: "280 x 68 x 180 cm",
    widthCm: 280,
    heightCm: 68,
    depthCm: 180,
    sortOrder: 3,
    image: IMAGES.outdoor,
    variants: [
     { name: "Gri", color: "Gri", material: "Outdoor kumaş", isDefault: true },
     { name: "Kum", color: "Kum", material: "Outdoor kumaş" },
    ],
   },
   {
    slug: "garden-bench",
    name: "Garden Bank",
    description:
     "Bahçe ve teras kenarı için minimal ahşap-metabol bank.",
    dimensions: "180 x 45 x 55 cm",
    widthCm: 180,
    heightCm: 45,
    depthCm: 55,
    sortOrder: 4,
    image: IMAGES.bench,
    variants: [
     { name: "Teak", material: "FSC Teak", isDefault: true },
    ],
   },
  ],
 },
];

async function createProduct(collectionId, data) {
 const product = await prisma.product.create({
  data: {
   slug: data.slug,
   name: data.name,
   description: data.description,
   dimensions: data.dimensions,
   widthCm: data.widthCm,
   heightCm: data.heightCm,
   depthCm: data.depthCm,
   sortOrder: data.sortOrder,
   collectionId,
   images: {
    create: [
     {
      url: data.image,
      alt: data.name,
      sortOrder: 0,
      isPrimary: true,
     },
     {
      url: IMAGES.sofa2,
      alt: `${data.name} detay`,
      sortOrder: 1,
      isPrimary: false,
     },
    ],
   },
   variants: {
    create: data.variants.map((v, index) => ({
     name: v.name,
     color: v.color ?? null,
     material: v.material ?? null,
     sortOrder: index,
     isDefault: Boolean(v.isDefault),
     sku: `${data.slug}-${index + 1}`.toUpperCase().replace(/-/g, ""),
    })),
   },
  },
 });

 return product;
}

async function main() {
 console.log("Veritabanı temizleniyor…");
 await prisma.image.deleteMany();
 await prisma.variant.deleteMany();
 await prisma.product.deleteMany();
 await prisma.collection.deleteMany();

 console.log("Koleksiyonlar ve ürünler ekleniyor…");

 for (const collectionData of COLLECTIONS) {
  const collection = await prisma.collection.create({
   data: {
    slug: collectionData.slug,
    name: collectionData.name,
    description: collectionData.description,
    coverImage: collectionData.coverImage,
    sortOrder: collectionData.sortOrder,
    isPublished: true,
   },
  });

  for (const productData of collectionData.products) {
   await createProduct(collection.id, productData);
  }

  console.log(`  ✓ ${collection.name} (${collectionData.products.length} ürün)`);
 }

 const counts = await Promise.all([
  prisma.collection.count(),
  prisma.product.count(),
  prisma.variant.count(),
  prisma.image.count(),
 ]);

 console.log("\nSeed tamamlandı:");
 console.log(`  Koleksiyon: ${counts[0]}`);
 console.log(`  Ürün: ${counts[1]}`);
 console.log(`  Varyant: ${counts[2]}`);
 console.log(`  Görsel: ${counts[3]}`);
}

main()
 .catch((error) => {
  console.error("Seed hatası:", error);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });
