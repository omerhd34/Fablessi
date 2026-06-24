import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

export const trGoogleHomeDescription =
 "İnegöl üretimi bahçe ve balkon mobilyaları. Şık, dayanıklı ve konforlu dış mekân yaşam alanları için özel koleksiyonlar.";

export const trGoogleSitelinks = [
 {
  key: "products",
  name: "Ürünler",
  href: "/urunler",
  description:
   "Fablessi'nin modern outdoor dünyasını keşfedin. Geniş koleksiyonlarımızı inceleyin.",
 },
 {
  key: "featured",
  name: "Öne Çıkan Ürünler",
  href: "/#one-cikan-urunler",
  description:
   "En çok tercih edilen Fablessi bahçe ve balkon mobilyası koleksiyonları.",
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
  description: "Şık masa grupları ve yemek takımlarını keşfedin.",
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

export function getGoogleSitelinkByHref(href) {
 return trGoogleSitelinks.find((link) => link.href === href) ?? null;
}

export function isSitelinkIndexableHref(href) {
 const link = getGoogleSitelinkByHref(href);
 return Boolean(link && !link.href.includes("#"));
}

export function isUrunlerCatalogIndexable({ categorySlug, collectionSlug, collection }) {
 if (collectionSlug) return Boolean(collection);
 if (!categorySlug) return true;
 return productMenuGroupsData.some((group) => group.slug === categorySlug);
}

export function getSitemapCategoryEntries() {
 return productMenuGroupsData.map((group) => ({
  path: `/urunler?kategori=${group.slug}`,
  priority: 0.8,
  changeFrequency: "weekly",
 }));
}

export function getSitemapSitelinkEntries() {
 return trGoogleSitelinks
  .filter((link) => !link.href.includes("#"))
  .map((link) => ({
   path: link.href,
   priority: link.href === "/urunler" ? 0.9 : 0.8,
   changeFrequency: link.href === "/iletisim" ? "monthly" : "weekly",
  }));
}

export function buildUrunlerCatalogHref(categorySlug, collectionSlug) {
 if (collectionSlug) return `/urunler?koleksiyon=${collectionSlug}`;
 if (categorySlug) return `/urunler?kategori=${categorySlug}`;
 return "/urunler";
}

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
