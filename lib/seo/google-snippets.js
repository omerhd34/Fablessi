import { brandFullName } from "@/lib/navigation";
import { productMenuGroupsData } from "@/lib/i18n/navigation-data";
import {
 enCatalogSeoBySlug,
 enPageSeo,
 trCatalogSeoBySlug,
 trPageSeo,
} from "@/lib/seo/pages";

export const FEATURED_SECTION_ID = "one-cikan-urunler";

function buildSitelinksFromCatalog(catalogSeo, locale) {
 const contactConfig =
  locale === "en"
   ? { pageTitle: "Contact", description: enPageSeo.contact.description }
   : { pageTitle: "İletişim", description: trPageSeo.contact.description };

 return [
  {
   key: "products",
   name: catalogSeo.default.metaTitle,
   href: "/urunler",
   description: catalogSeo.default.description,
  },
  {
   key: "featured",
   name: locale === "en" ? "Featured Products" : "Öne Çıkan Ürünler",
   href: "/#one-cikan-urunler",
   description:
    locale === "en"
     ? "Season's featured garden and balcony furniture designs. Fablessi's most popular collections."
     : "Sezonun öne çıkan bahçe ve balkon mobilyası tasarımları. En çok tercih edilen Fablessi koleksiyonları.",
  },
  ...Object.entries(catalogSeo)
   .filter(([slug]) => slug !== "default")
   .map(([slug, config]) => ({
    key: slug,
    name: config.metaTitle,
    href: `/urunler?kategori=${slug}`,
    description: config.description,
   })),
  {
   key: "contact",
   name: `${contactConfig.pageTitle} | ${brandFullName}`,
   href: "/iletisim",
   description: contactConfig.description,
  },
 ];
}

export const trGoogleSitelinks = buildSitelinksFromCatalog(trCatalogSeoBySlug, "tr");
export const enGoogleSitelinks = buildSitelinksFromCatalog(enCatalogSeoBySlug, "en");

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

export function getGoogleSitelinks(locale = "tr") {
 if (locale === "en") return enGoogleSitelinks;
 if (locale === "tr") return trGoogleSitelinks;
 return [];
}

export function getGoogleFeaturedSectionMeta(locale = "tr") {
 const sitelinks = getGoogleSitelinks(locale);
 const featured = sitelinks.find((link) => link.key === "featured");
 return featured ?? null;
}
