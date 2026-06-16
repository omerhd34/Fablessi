export const trGoogleHomeDescription =
 "İnegöl üretimi bahçe ve balkon mobilyaları. Şık, dayanıklı ve konforlu dış mekân yaşam alanları için özel koleksiyonlar.";

export const trGoogleSitelinks = [
 {
  key: "featured",
  name: "Öne Çıkan Ürünler",
  href: "/#one-cikan-urunler",
 },
 {
  key: "oturma-gruplari",
  name: "OTURMA GRUPLARI",
  href: "/urunler?kategori=oturma-gruplari",
 },
 {
  key: "masalar",
  name: "MASA GRUPLARI",
  href: "/urunler?kategori=masalar",
 },
 {
  key: "kose-gruplari",
  name: "KÖŞE GRUPLARI",
  href: "/urunler?kategori=kose-gruplari",
 },
 {
  key: "contact",
  name: "İLETİŞİM",
  href: "/iletisim",
 },
];

const trGoogleProductsDescriptions = {
 default:
  "Fablessi'nin modern outdoor dünyasını keşfedin. Geniş koleksiyonlarımızı inceleyin.",
 "oturma-gruplari":
  "Fablessi'nin modern outdoor dünyasını keşfedin. Konforlu köşe takımları ve oturma grupları.",
 masalar: "Şık masa grupları ve yemek takımlarını keşfedin.",
};

const trGooglePageDescriptions = {
 contact:
  "Seçkin koleksiyonları yakından inceleyin. İletişim bilgilerimize ulaşın.",
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
