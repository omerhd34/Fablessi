import { brandFullName, brandName } from "@/lib/brand";
import {
 enLocalSeoDescription,
 trLocalSeoDescription,
} from "@/lib/seo/local";

export const trCatalogDescription =
 "İnegöl üretimi bahçe ve balkon mobilyaları, Oturma gruplarından salıncaklara tüm koleksiyonlarımızı inceleyin.";

export const enCatalogDescription =
 "Garden and balcony furniture made in İnegöl. Explore our full collection from seating sets to swings.";

export const seoSiteName = brandFullName;

function pageSeoEntry(pageTitle, description) {
 return {
  pageTitle,
  metaTitle: `${pageTitle} - ${brandName}`,
  description,
 };
}

export const trPageSeo = {
 home: {
  absoluteTitle: `${brandFullName} - İnegöl Bahçe & Balkon Mobilyaları`,
  description: trLocalSeoDescription,
 },
 about: pageSeoEntry(
  "Hakkımızda",
  "Gardossi, dış mekân yaşamını konfor ve estetikle buluşturma vizyonuyla kurulmuş bir bahçe mobilyası markasıdır. Bahçe, teras ve balkonlarda geçirilen zamanı daha keyifli kılmak için özenle seçilmiş ürünlerimizi sizlerle buluşturuyoruz."
 ),
 missionVision: pageSeoEntry(
  "Misyon ve Vizyon",
  "İnegöl'de üretilen premium bahçe mobilyası markası Gardossi'nin misyonunu ve vizyonunu keşfedin."
 ),
 values: pageSeoEntry(
  "Değerlerimiz",
  "İnegöl'de üretilen premium bahçe mobilyası markası Gardossi'nin kalite, tasarım, şeffaflık ve müşteri odaklılık değerlerini keşfedin."
 ),
 commitments: pageSeoEntry(
  "Taahhütlerimiz",
  "Gardossi'nin doğru ürün bilgisi, kaliteli üretim ve sürdürülebilir dış mekân mobilyası taahhütlerini keşfedin."
 ),
 faq: pageSeoEntry(
  "Sık Sorulan Sorular",
  "Sıkça Sorulan Sorular bölümünde, en yaygın soruları ve bu sorulara verilen cevapları bulacaksınız."
 ),
 contact: pageSeoEntry(
  "İletişim",
  "İnegöl/Bursa mağazamıza davetlisiniz. Bahçe mobilyası seçiminde uzman desteği, adres ve tüm iletişim bilgilerimiz burada."
 ),
 products: pageSeoEntry("Ürünler", trCatalogDescription),
 policies: pageSeoEntry(
  "Politikalar",
  "Gardossi KVKK aydınlatma metni, gizlilik ve güvenlik politikası ile çerez politikası."
 ),
};

export const enPageSeo = {
 home: {
  absoluteTitle: `${brandFullName} - İnegöl Garden and Balcony Furniture`,
  description: enLocalSeoDescription,
 },
 about: pageSeoEntry(
  "About Us",
  "Gardossi is a garden furniture brand founded with a vision to bring comfort and aesthetics to outdoor living. We offer carefully selected products to make your time in the garden, on the terrace and on the balcony more enjoyable."
 ),
 missionVision: pageSeoEntry(
  "Mission and Vision",
  "Discover the mission and vision of Gardossi, a premium garden furniture brand made in İnegöl."
 ),
 values: pageSeoEntry(
  "Our Values",
  "Discover the quality, design, transparency and customer-focus values of Gardossi, a premium garden furniture brand made in İnegöl."
 ),
 commitments: pageSeoEntry(
  "Our Commitments",
  "Discover Gardossi's commitments to accurate product information, quality manufacturing and sustainable outdoor furniture."
 ),
 faq: pageSeoEntry(
  "Frequently Asked Questions",
  "In the Frequently Asked Questions section, you will find the most common questions and their answers."
 ),
 contact: pageSeoEntry(
  "Contact",
  "You're invited to visit our İnegöl/Bursa showroom. Expert support for choosing garden furniture, plus our address and full contact details."
 ),
 products: pageSeoEntry("Products", enCatalogDescription),
 policies: pageSeoEntry(
  "Policies",
  "Gardossi PDPL notice, privacy and security policy, and cookie policy."
 ),
};

export const pageSeoPaths = {
 home: "/",
 about: "/hakkimizda",
 missionVision: "/misyon-vizyon",
 values: "/degerlerimiz",
 commitments: "/taahhutlerimiz",
 faq: "/sss",
 contact: "/iletisim",
 products: "/urunler",
 policies: "/politikalar",
};

function catalogSeoEntry(pageTitle, description) {
 return {
  pageTitle,
  metaTitle: `${pageTitle} - ${brandName}`,
  description,
 };
}

export const trCatalogSeoBySlug = {
 default: catalogSeoEntry("Ürünler", trCatalogDescription),
 "oturma-gruplari": catalogSeoEntry(
  "Oturma Grupları",
  "İnegöl üretimi bahçe ve balkon oturma grupları. Açelya, Velar, Begonia, Aston ve Tesla koleksiyonlarını inceleyin."
 ),
 "kose-gruplari": catalogSeoEntry(
  "Köşe Grupları",
  "İnegöl üretimi köşe bahçe takımları. Tesla ve Velar köşe oturma gruplarıyla terasınızı düzenleyin."
 ),
 masalar: catalogSeoEntry(
  "Masa Grupları",
  "İnegöl üretimi bahçe masa grupları. Tesla ve Velar masa modelleriyle dış mekân sofranızı kurun."
 ),
 salincak: catalogSeoEntry(
  "Salıncaklar",
  "İnegöl üretimi bahçe salıncakları. Tesla ve Velar salıncak modelleriyle keyifli bir dinlenme alanı oluşturun."
 ),
 sezlong: catalogSeoEntry(
  "Şezlonglar",
  "İnegöl üretimi bahçe şezlongları. Velar şezlong ile güneşlenme ve dinlenme alanınızı tamamlayın."
 ),
 sandalyeler: catalogSeoEntry(
  "Sandalyeler",
  "İnegöl üretimi bahçe sandalyeleri. Trend sandalye modelleriyle balkon ve teras oturumunuzu tamamlayın."
 ),
};

export const enCatalogSeoBySlug = {
 default: catalogSeoEntry("Products", enCatalogDescription),
 "oturma-gruplari": catalogSeoEntry(
  "Seating Sets",
  "Garden and balcony seating sets made in İnegöl. Explore Açelya, Velar, Begonia, Aston and Tesla collections."
 ),
 "kose-gruplari": catalogSeoEntry(
  "Corner Sets",
  "Corner garden sofa sets made in İnegöl. Arrange your terrace with Tesla and Velar corner seating."
 ),
 masalar: catalogSeoEntry(
  "Table Sets",
  "Garden table sets made in İnegöl. Set your outdoor dining with Tesla and Velar table models."
 ),
 salincak: catalogSeoEntry(
  "Swings",
  "Garden swings made in İnegöl. Create a relaxing spot with Tesla and Velar swing models."
 ),
 sezlong: catalogSeoEntry(
  "Sun Loungers",
  "Garden sun loungers made in İnegöl. Complete your lounge area with the Velar sun lounger."
 ),
 sandalyeler: catalogSeoEntry(
  "Chairs",
  "Garden chairs made in İnegöl. Finish your balcony and terrace seating with Trend chair models."
 ),
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
