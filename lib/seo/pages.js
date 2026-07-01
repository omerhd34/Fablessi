import { brandFullName } from "@/lib/navigation";
import {
 enLocalSeoDescription,
 enLocalSeoTitle,
 trLocalSeoDescription,
 trLocalSeoTitle,
} from "@/lib/seo/local";

export const trCatalogDescription =
 "İnegöl üretimi bahçe ve balkon mobilyaları, Oturma gruplarından salıncaklara tüm koleksiyonlarımızı inceleyin.";

export const enCatalogDescription =
 "Garden and balcony furniture made in İnegöl. Explore our full collection from seating sets to swings.";

/** Google A: site adı */
export const seoSiteName = brandFullName;

/** Google B + C — statik sayfalar */
export const trPageSeo = {
 home: {
  absoluteTitle: `${brandFullName} | ${trLocalSeoTitle}`,
  description: trLocalSeoDescription,
 },
 about: {
  pageTitle: "Hakkımızda",
  description:
   "Fablessi Outdoor Living, dış mekân yaşamını konfor ve estetikle buluşturma vizyonuyla kurulmuş bir bahçe mobilyası markasıdır. Bahçe, teras ve balkonlarda geçirilen zamanı daha keyifli kılmak için özenle seçilmiş ürünlerimizi sizlerle buluşturuyoruz.",
 },
 missionVision: {
  pageTitle: "Misyon ve Vizyon",
  description:
   "İnegöl'de üretilen premium bahçe mobilyası markası Fablessi'nin misyonu, vizyonu, değerleri ve kalite taahhütlerini keşfedin.",
 },
 faq: {
  pageTitle: "Sık Sorulan Sorular",
  description:
   "Sıkça Sorulan Sorular bölümünde, en yaygın soruları ve bu sorulara verilen cevapları bulacaksınız.",
 },
 contact: {
  pageTitle: "İletişim",
  description:
   "İnegöl/Bursa mağazamıza davetlisiniz. Bahçe mobilyası seçiminde uzman desteği, adres ve tüm iletişim bilgilerimiz burada.",
 },
 products: {
  pageTitle: "Ürünler",
  description: trCatalogDescription,
 },
};

export const enPageSeo = {
 home: {
  absoluteTitle: `${brandFullName} | ${enLocalSeoTitle}`,
  description: enLocalSeoDescription,
 },
 about: {
  pageTitle: "About Us",
  description:
   "Fablessi Outdoor Living is a garden furniture brand founded with a vision to bring comfort and aesthetics to outdoor living. We offer carefully selected products to make your time in the garden, on the terrace and on the balcony more enjoyable.",
 },
 missionVision: {
  pageTitle: "Mission and Vision",
  description:
   "Discover the mission, vision, values and quality commitments of Fablessi, a premium garden furniture brand made in İnegöl.",
 },
 faq: {
  pageTitle: "Frequently Asked Questions",
  description:
   "In the Frequently Asked Questions section, you will find the most common questions and their answers.",
 },
 contact: {
  pageTitle: "Contact",
  description:
   "You're invited to visit our İnegöl/Bursa showroom. Expert support for choosing garden furniture, plus our address and full contact details.",
 },
 products: {
  pageTitle: "Products",
  description: enCatalogDescription,
 },
};

/** Google B + C — ürün kataloğu ve kategori sayfaları */
function catalogSeoEntry(pageTitle, description) {
 return {
  pageTitle,
  metaTitle: `${pageTitle} | ${brandFullName}`,
  description,
 };
}

export const trCatalogSeoBySlug = {
 default: catalogSeoEntry("Ürünler", trCatalogDescription),
 "oturma-gruplari": catalogSeoEntry("Oturma Grupları", trCatalogDescription),
 "kose-gruplari": catalogSeoEntry("Köşe Grupları", trCatalogDescription),
 masalar: catalogSeoEntry("Masa Grupları", trCatalogDescription),
 salincak: catalogSeoEntry("Salıncaklar", trCatalogDescription),
 sezlong: catalogSeoEntry("Şezlonglar", trCatalogDescription),
 sandalyeler: catalogSeoEntry("Sandalyeler", trCatalogDescription),
};

export const enCatalogSeoBySlug = {
 default: catalogSeoEntry("Products", enCatalogDescription),
 "oturma-gruplari": catalogSeoEntry("Seating Sets", enCatalogDescription),
 "kose-gruplari": catalogSeoEntry("Corner Sets", enCatalogDescription),
 masalar: catalogSeoEntry("Table Sets", enCatalogDescription),
 salincak: catalogSeoEntry("Swings", enCatalogDescription),
 sezlong: catalogSeoEntry("Sun Loungers", enCatalogDescription),
 sandalyeler: catalogSeoEntry("Chairs", enCatalogDescription),
};

export function getPageSeoConfig(pageKey, locale = "tr") {
 const pages = locale === "en" ? enPageSeo : trPageSeo;
 return pages[pageKey] ?? null;
}

export function getPageSeoDescription(pageKey, locale = "tr") {
 return getPageSeoConfig(pageKey, locale)?.description ?? null;
}

export function getCatalogSeoConfig(categorySlug, locale = "tr") {
 const catalog = locale === "en" ? enCatalogSeoBySlug : trCatalogSeoBySlug;
 if (!categorySlug) return catalog.default;
 return catalog[categorySlug] ?? catalog.default;
}
