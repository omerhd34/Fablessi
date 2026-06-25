import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

export const trGoogleHomeDescription =
 "İnegöl üretimi bahçe ve balkon mobilyaları ile dış mekânınızı konforlu bir yaşam alanına dönüştürün.";

export const trGoogleSitelinks = [
 {
  key: "products",
  name: "Ürünler",
  href: "/urunler",
  description:
   "İnegöl üretimi bahçe ve balkon mobilyası kataloğu. Tüm koleksiyonlarımızı tek sayfada keşfedin.",
 },
 {
  key: "featured",
  name: "Öne Çıkan Ürünler",
  href: "/#one-cikan-urunler",
  description:
   "Sezonun öne çıkan bahçe ve balkon mobilyası tasarımları. En çok tercih edilen Fablessi koleksiyonları.",
 },
 {
  key: "oturma-gruplari",
  name: "Oturma Grupları",
  href: "/urunler?kategori=oturma-gruplari",
  description:
   "Konforlu bahçe oturma grupları ve dış mekan koltuk takımları. Açelya, Aston, Begonia ve daha fazlası.",
 },
 {
  key: "kose-gruplari",
  name: "Köşe Grupları",
  href: "/urunler?kategori=kose-gruplari",
  description:
   "Geniş bahçe köşe takımları ve modüler dış mekan oturma çözümleri. Tesla ve Velar koleksiyonları.",
 },
 {
  key: "masalar",
  name: "Masa Grupları",
  href: "/urunler?kategori=masalar",
  description:
   "Bahçe ve teras için şık masa takımları. Dayanıklı dış mekan yemek masaları ve setleri.",
 },
 {
  key: "salincak",
  name: "Salıncaklar",
  href: "/urunler?kategori=salincak",
  description:
   "Bahçe salıncakları ve dış mekan salıncak modelleri. Tesla ve Velar koleksiyonlarından seçenekler.",
 },
 {
  key: "sezlong",
  name: "Şezlonglar",
  href: "/urunler?kategori=sezlong",
  description:
   "Premium bahçe şezlongları ve güneşlenme üniteleri. Velar koleksiyonundan dış mekan şezlonglar.",
 },
 {
  key: "sandalyeler",
  name: "Sandalyeler",
  href: "/urunler?kategori=sandalyeler",
  description:
   "Bahçe sandalyeleri ve dış mekan sandalye modelleri. Trend koleksiyonundan şık seçenekler.",
 },
 {
  key: "contact",
  name: "İletişim",
  href: "/iletisim",
  description:
   "İnegöl/Bursa mağazamızdan bize ulaşın. Bahçe mobilyası danışmanlığı, adres ve iletişim bilgileri.",
 },
];

const trGoogleProductsDescriptions = {
 default:
  "İnegöl üretimi bahçe ve balkon mobilyası kataloğu. Oturma gruplarından salıncaklara tüm koleksiyonlarımızı inceleyin.",
 "oturma-gruplari":
  "Konforlu bahçe oturma grupları ve dış mekan koltuk takımları. Açelya, Aston, Begonia ve daha fazlası.",
 "kose-gruplari":
  "Geniş bahçe köşe takımları ve modüler dış mekan oturma çözümleri. Tesla ve Velar koleksiyonları.",
 masalar:
  "Bahçe ve teras için şık masa takımları. Dayanıklı dış mekan yemek masaları ve setleri.",
 salincak:
  "Bahçe salıncakları ve dış mekan salıncak modelleri. Tesla ve Velar koleksiyonlarından seçenekler.",
 sezlong:
  "Premium bahçe şezlongları ve güneşlenme üniteleri. Velar koleksiyonundan dış mekan şezlonglar.",
 sandalyeler:
  "Bahçe sandalyeleri ve dış mekan sandalye modelleri. Trend koleksiyonundan şık seçenekler.",
};

const trGooglePageDescriptions = {
 contact:
  "İnegöl/Bursa mağazamızdan bize ulaşın. Bahçe mobilyası danışmanlığı, adres ve iletişim bilgileri.",
 products: trGoogleProductsDescriptions.default,
 missionVision:
  "Fablessi'nin misyonu, vizyonu ve bahçe mobilyasında kalite taahhütleri. Premium dış mekan mobilyası markası.",
};

export function getGoogleSitelinkByHref(href) {
 return trGoogleSitelinks.find((link) => link.href === href) ?? null;
}

export function isSitelinkIndexableHref(href) {
 const link = getGoogleSitelinkByHref(href);
 return Boolean(link && !link.href.includes("#"));
}

export function isUrunlerCatalogIndexable({ categorySlug }) {
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

export function buildUrunlerCatalogHref(categorySlug) {
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

export function getGoogleCatalogMetadata({ categorySlug, locale = "tr", dictionary }) {
 const page = dictionary.pages.products;
 const catalogHref = buildUrunlerCatalogHref(categorySlug);

 if (categorySlug) {
  const categoryLabel = dictionary.categories?.[categorySlug];
  return {
   title: categoryLabel ?? page.title,
   description: getGoogleProductsDescription(categorySlug, locale) ?? page.description,
  };
 }

 const sitelink = getGoogleSitelinkByHref(catalogHref);
 return {
  title: sitelink?.name ?? page.title,
  description:
   sitelink?.description ??
   getGoogleProductsDescription(null, locale) ??
   page.description,
 };
}
