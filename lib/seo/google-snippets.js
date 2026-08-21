import { productMenuGroupsData } from "@/lib/i18n/navigation-data";
import {
 enCatalogSeoBySlug,
 enPageSeo,
 trCatalogSeoBySlug,
 trPageSeo,
} from "@/lib/seo/pages";

export const FEATURED_SECTION_ID = "one-cikan-urunler";

export function buildUrunlerCatalogHref(categorySlug) {
 if (categorySlug) return `/urunler?kategori=${categorySlug}`;
 return "/urunler";
}

function buildFeaturedSectionMeta(locale) {
 return {
  key: "featured",
  name: locale === "en" ? "Featured Products" : "Öne Çıkan Ürünler",
  href: `/#${FEATURED_SECTION_ID}`,
  description:
   locale === "en"
    ? "Season's featured garden and balcony furniture designs. Gardossi's most popular collections."
    : "Sezonun öne çıkan bahçe ve balkon mobilyası tasarımları. En çok tercih edilen Gardossi koleksiyonları.",
 };
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
 return trGoogleSitelinks
  .filter((link) => !link.href.includes("#"))
  .map((link) => ({
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

export function getGoogleFeaturedSectionMeta(locale = "tr") {
 return buildFeaturedSectionMeta(locale);
}
