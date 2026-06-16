export const trGoogleHomeDescription =
 "İnegöl üretimi bahçe ve balkon mobilyaları. Şık, dayanıklı ve konforlu dış mekân yaşam alanları için özel koleksiyonlar.";

export const trGoogleSitelinks = [
 {
  key: "featured",
  name: "Öne Çıkan Ürünler",
  href: "/#one-cikan-urunler",
  description:
   "Fablessi kalitesine avantajlı koşullarla sahip olun. Modern, indirimli setleri ve kampanyalı modelleri keşfedin.",
 },
 {
  key: "products",
  name: "Ürünler",
  href: "/urunler",
  description:
   "Fablessi'nin modern outdoor dünyasını keşfedin. Geniş koleksiyonlarımızı inceleyin.",
 },
 {
  key: "oturma-gruplari",
  name: "Oturma Grupları",
  href: "/urunler?kategori=oturma-gruplari",
  description:
   "Fablessi'nin modern outdoor dünyasını keşfedin. Konforlu köşe takımları ve oturma grupları.",
 },
 {
  key: "masalar",
  name: "Masa Grupları",
  href: "/urunler?kategori=masalar",
  description:
   "Şık masa grupları ve yemek takımlarını keşfedin.",
 },
 {
  key: "contact",
  name: "İletişim",
  href: "/iletisim",
  description:
   "Seçkin koleksiyonları yakından inceleyin. İletişim bilgilerimize ulaşın.",
 },
];

const trGoogleProductsDescriptions = {
 default: trGoogleSitelinks.find((link) => link.key === "products").description,
 "oturma-gruplari": trGoogleSitelinks.find((link) => link.key === "oturma-gruplari")
  .description,
 masalar: trGoogleSitelinks.find((link) => link.key === "masalar").description,
};

const trGooglePageDescriptions = {
 contact: trGoogleSitelinks.find((link) => link.key === "contact").description,
 products: trGoogleProductsDescriptions.default,
};

export function getGoogleHomeDescription(locale = "tr") {
 if (locale === "tr") return trGoogleHomeDescription;
 return null;
}

export function getGoogleSitelinks(locale = "tr") {
 if (locale === "tr") return trGoogleSitelinks;
 return [];
}

export function getGooglePageDescription(pageKey, locale = "tr") {
 if (locale !== "tr") return null;
 return trGooglePageDescriptions[pageKey] ?? null;
}

export function getGoogleProductsDescription(categorySlug, locale = "tr") {
 if (locale !== "tr") return null;
 if (!categorySlug) return trGoogleProductsDescriptions.default;
 return trGoogleProductsDescriptions[categorySlug] ?? trGoogleProductsDescriptions.default;
}

export function getGoogleFeaturedSectionMeta(locale = "tr") {
 if (locale !== "tr") return null;
 const featured = trGoogleSitelinks.find((link) => link.key === "featured");
 return featured ?? null;
}