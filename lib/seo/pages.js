import { productMenuGroupsData } from "@/lib/i18n/navigation-data";
import {
 enLocalSeoDescription,
 trLocalSeoDescription,
} from "@/lib/seo/local";

export const trCatalogDescription =
 "İnegöl üretimi bahçe ve balkon mobilyaları, oturma gruplarından salıncaklara tüm koleksiyonlarımızı inceleyin.";

export const enCatalogDescription =
 "Garden and balcony furniture made in İnegöl. Explore our full collection from seating sets to swings.";

/* A = seoSiteName (site-metadata), B = metaTitle, C = description. */
function seoEntry(pageTitle, description, metaTitle = null) {
 return {
  pageTitle,
  metaTitle: metaTitle ?? `${pageTitle} - Gardossi`,
  description,
 };
}

export const trPageSeo = {
 home: seoEntry(
  "Gardossi",
  trLocalSeoDescription,
  "Gardossi - İnegöl Bahçe & Balkon Mobilyaları"
 ),
 about: seoEntry(
  "Hakkımızda",
  "Gardossi, dış mekân yaşamını konfor ve estetikle buluşturma vizyonuyla kurulmuş bir bahçe mobilyası markasıdır. Bahçe, teras ve balkonlarda geçirilen zamanı daha keyifli kılmak için özenle seçilmiş ürünlerimizi sizlerle buluşturuyoruz."
 ),
 missionVision: seoEntry(
  "Misyon ve Vizyon",
  "İnegöl'de üretilen premium bahçe mobilyası markası Gardossi'nin misyonunu ve vizyonunu keşfedin."
 ),
 values: seoEntry(
  "Değerler",
  "İnegöl'de üretilen premium bahçe mobilyası markası Gardossi'nin kalite, tasarım, şeffaflık ve müşteri odaklılık değerlerini keşfedin."
 ),
 commitments: seoEntry(
  "Taahhütler",
  "Gardossi'nin doğru ürün bilgisi, kaliteli üretim ve sürdürülebilir dış mekân mobilyası taahhütlerini keşfedin."
 ),
 faq: seoEntry(
  "Sık Sorulan Sorular",
  "Sıkça sorulan sorular bölümünde ürün, teslimat ve bakım hakkında en yaygın soruları ve cevaplarını bulacaksınız."
 ),
 contact: seoEntry(
  "İletişim",
  "İnegöl/Bursa mağazamıza davetlisiniz. Bahçe mobilyası seçiminde uzman desteği, adres ve tüm iletişim bilgilerimiz burada bulunmaktadır."
 ),
 products: seoEntry("Ürünler", trCatalogDescription),
};

export const enPageSeo = {
 home: seoEntry(
  "Gardossi",
  enLocalSeoDescription,
  "Gardossi - İnegöl Garden and Balcony Furniture"
 ),
 about: seoEntry(
  "About Us",
  "Gardossi brings comfort and aesthetics to outdoor living with garden furniture made in İnegöl. Explore pieces for garden, terrace and balcony."
 ),
 missionVision: seoEntry(
  "Mission and Vision",
  "Discover the mission and vision of Gardossi, a premium garden furniture brand made in İnegöl."
 ),
 values: seoEntry(
  "Values",
  "Discover the quality, design, transparency and customer-focus values of Gardossi, a premium garden furniture brand made in İnegöl."
 ),
 commitments: seoEntry(
  "Commitments",
  "Discover Gardossi's commitments to accurate product information, quality manufacturing and sustainable outdoor furniture."
 ),
 faq: seoEntry(
  "Frequently Asked Questions",
  "Find answers to the most common questions about products, delivery and care in our FAQ."
 ),
 contact: seoEntry(
  "Contact",
  "Visit our İnegöl/Bursa showroom. Expert help choosing garden furniture, plus address and full contact details."
 ),
 products: seoEntry("Products", enCatalogDescription),
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
};

export const trCatalogSeoBySlug = {
 default: seoEntry("Ürünler", trCatalogDescription),
 "oturma-gruplari": seoEntry(
  "Oturma Grupları",
  "İnegöl üretimi bahçe ve balkon oturma grupları. Açelya, Velar, Begonia, Aston ve Tesla koleksiyonlarını inceleyin."
 ),
 "kose-gruplari": seoEntry(
  "Köşe Grupları",
  "İnegöl üretimi köşe bahçe takımları. Tesla ve Velar köşe oturma gruplarıyla terasınızı düzenleyin."
 ),
 masalar: seoEntry(
  "Masa Grupları",
  "İnegöl üretimi bahçe masa grupları. Tesla ve Velar masa modelleriyle dış mekân sofranızı kurun."
 ),
 salincak: seoEntry(
  "Salıncaklar",
  "İnegöl üretimi bahçe salıncakları. Tesla ve Velar salıncak modelleriyle keyifli bir dinlenme alanı oluşturun."
 ),
 sezlong: seoEntry(
  "Şezlonglar",
  "İnegöl üretimi bahçe şezlongları. Velar şezlong ile güneşlenme ve dinlenme alanınızı tamamlayın."
 ),
 sandalyeler: seoEntry(
  "Sandalyeler",
  "İnegöl üretimi bahçe sandalyeleri. Trend sandalye modelleriyle balkon ve teras oturumunuzu tamamlayın."
 ),
};

export const enCatalogSeoBySlug = {
 default: seoEntry("Products", enCatalogDescription),
 "oturma-gruplari": seoEntry(
  "Seating Sets",
  "Garden and balcony seating sets made in İnegöl. Explore Açelya, Velar, Begonia, Aston and Tesla collections."
 ),
 "kose-gruplari": seoEntry(
  "Corner Sets",
  "Corner garden sofa sets made in İnegöl. Arrange your terrace with Tesla and Velar corner seating."
 ),
 masalar: seoEntry(
  "Table Sets",
  "Garden table sets made in İnegöl. Set your outdoor dining with Tesla and Velar table models."
 ),
 salincak: seoEntry(
  "Swings",
  "Garden swings made in İnegöl. Create a relaxing spot with Tesla and Velar swing models."
 ),
 sezlong: seoEntry(
  "Sun Loungers",
  "Garden sun loungers made in İnegöl. Complete your lounge area with the Velar sun lounger."
 ),
 sandalyeler: seoEntry(
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

export function buildPageSeoMetadata(pageKey, locale = "tr") {
 const config = getPageSeoConfig(pageKey, locale);
 if (!config) return null;

 return {
  pageTitle: config.pageTitle,
  metaTitle: config.metaTitle,
  title: { absolute: config.metaTitle },
  openGraphTitle: config.metaTitle,
  description: config.description,
 };
}

export function buildCatalogSeoMetadata(categorySlug, locale = "tr") {
 const config = getCatalogSeoConfig(categorySlug, locale);

 return {
  pageTitle: config.pageTitle,
  metaTitle: config.metaTitle,
  title: { absolute: config.metaTitle },
  openGraphTitle: config.metaTitle,
  description: config.description,
 };
}

export function buildUrunlerCatalogHref(categorySlug) {
 if (categorySlug) return `/urunler?kategori=${categorySlug}`;
 return "/urunler";
}

function buildSitelinksFromCatalog(catalogSeo, pageSeo) {
 const categoryLinks = productMenuGroupsData.map((group) => {
  const seo = catalogSeo[group.slug] ?? catalogSeo.default;
  return {
   key: group.slug,
   name: seo.pageTitle,
   href: buildUrunlerCatalogHref(group.slug),
   description: seo.description,
  };
 });

 return [
  ...categoryLinks,
  {
   key: "contact",
   name: pageSeo.contact.pageTitle,
   href: "/iletisim",
   description: pageSeo.contact.description,
  },
 ];
}

export const trGoogleSitelinks = buildSitelinksFromCatalog(
 trCatalogSeoBySlug,
 trPageSeo
);
export const enGoogleSitelinks = buildSitelinksFromCatalog(
 enCatalogSeoBySlug,
 enPageSeo
);

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
 return trGoogleSitelinks.map((link) => ({
  path: link.href,
  priority: link.href === "/iletisim" ? 0.8 : 0.85,
  changeFrequency: link.href === "/iletisim" ? "monthly" : "weekly",
 }));
}

export function getGoogleSitelinks(locale = "tr") {
 if (locale === "en") return enGoogleSitelinks;
 if (locale === "tr") return trGoogleSitelinks;
 return [];
}
