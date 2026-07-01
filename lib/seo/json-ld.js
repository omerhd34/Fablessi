import { brandFullName, brandName } from "@/lib/navigation";
import { getFlagshipStore } from "@/lib/stores";
import {
 enLocalSeoDescription,
 trLocalSeoDescription,
} from "@/lib/seo/local";
import { resolveSiteHomeUrl, resolveSiteUrl } from "@/lib/site-metadata";
import {
 FEATURED_SECTION_ID,
 buildUrunlerCatalogHref,
 getGoogleFeaturedSectionMeta,
 getGoogleSitelinks,
} from "@/lib/seo/google-snippets";
import { getCatalogSeoConfig } from "@/lib/seo/pages";
import { buildProductSeoDescription } from "@/lib/seo/product-description";
import { siteEmail, sitePhoneHref } from "@/lib/site-contact";
import { getProductDisplayPrice } from "@/lib/product-utils";

const GEO = {
 latitude: 40.07183049974077,
 longitude: 29.527898513892158,
};

export function buildOrganizationJsonLd(locale = "tr") {
 const store = getFlagshipStore(locale);
 const siteUrl = resolveSiteUrl();
 const description =
  locale === "en" ? enLocalSeoDescription : trLocalSeoDescription;
 const telephone = sitePhoneHref?.replace(/^tel:/, "") ?? undefined;

 return {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${siteUrl}/#organization`,
  name: brandFullName,
  alternateName: [brandName],
  description,
  url: resolveSiteHomeUrl(),
  ...(telephone ? { telephone } : {}),
  ...(siteEmail ? { email: siteEmail } : {}),
  address: {
   "@type": "PostalAddress",
   streetAddress: "Mahmudiye Mahallesi, 11. Mobilya Sokak No: 21/I",
   addressLocality: "İnegöl",
   addressRegion: "Bursa",
   postalCode: "16400",
   addressCountry: "TR",
  },
  geo: {
   "@type": "GeoCoordinates",
   latitude: GEO.latitude,
   longitude: GEO.longitude,
  },
  areaServed: [
   { "@type": "City", name: "İnegöl" },
   { "@type": "AdministrativeArea", name: "Bursa" },
   { "@type": "Country", name: "Türkiye" },
  ],
  hasMap: store.mapUrl,
  image: `${siteUrl}/og-image.jpg`,
  logo: {
   "@type": "ImageObject",
   url: `${siteUrl}/brand/favicon-512.png`,
   width: 512,
   height: 512,
  },
 };
}

export function buildSiteStructuredDataGraph(locale = "tr") {
 return {
  "@context": "https://schema.org",
  "@graph": [buildOrganizationJsonLd(locale), buildWebSiteJsonLd()],
 };
}

export function buildWebSiteJsonLd() {
 const siteUrl = resolveSiteUrl();
 const siteHomeUrl = resolveSiteHomeUrl();

 return {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: brandFullName,
  alternateName: [brandName, "fablessi.com", "www.fablessi.com"],
  url: siteHomeUrl,
  inLanguage: ["tr-TR", "en-US"],
  publisher: {
   "@type": "Organization",
   "@id": `${siteUrl}/#organization`,
   name: brandFullName,
   url: siteHomeUrl,
   logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/brand/favicon-512.png`,
    width: 512,
    height: 512,
   },
  },
 };
}

export function buildSiteNavigationJsonLd(locale = "tr") {
 const siteUrl = resolveSiteUrl();
 const sitelinks = getGoogleSitelinks(locale);

 return {
  "@context": "https://schema.org",
  "@graph": sitelinks.map((link) => ({
   "@type": "WebPage",
   name: link.name,
   url: `${siteUrl}${link.href}`,
   ...(link.description ? { description: link.description } : {}),
   isPartOf: { "@id": `${siteUrl}/#website` },
  })),
 };
}

export function buildFeaturedSectionJsonLd(locale = "tr") {
 const siteUrl = resolveSiteUrl();
 const featured = getGoogleFeaturedSectionMeta(locale);
 if (!featured) return null;

 return {
  "@context": "https://schema.org",
  "@type": "WebPageElement",
  "@id": `${siteUrl}/#${FEATURED_SECTION_ID}`,
  name: featured.name,
  ...(featured.description ? { description: featured.description } : {}),
  isPartOf: { "@id": `${siteUrl}/#website` },
  url: `${siteUrl}${featured.href}`,
 };
}

export function buildCatalogWebPageJsonLd({ categorySlug, locale = "tr" } = {}) {
 const siteUrl = resolveSiteUrl();
 const catalogHref = buildUrunlerCatalogHref(categorySlug);
 const seo = getCatalogSeoConfig(categorySlug, locale);
 const pageUrl = `${siteUrl}${catalogHref}`;

 return {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  name: seo.metaTitle,
  description: seo.description,
  url: pageUrl,
  isPartOf: { "@id": `${siteUrl}/#website` },
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: locale === "en" ? "en-US" : "tr-TR",
 };
}

function resolveAbsoluteImageUrl(url, siteUrl) {
 if (!url) return undefined;
 if (url.startsWith("http://") || url.startsWith("https://")) return url;
 return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

function formatSchemaPrice(amount) {
 return Number(amount).toFixed(2);
}

function buildProductOffers(product, productUrl, siteUrl) {
 const price = getProductDisplayPrice(product);
 if (price == null) return null;

 return {
  "@type": "Offer",
  url: productUrl,
  priceCurrency: "TRY",
  price: formatSchemaPrice(price),
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
  seller: {
   "@type": "Organization",
   "@id": `${siteUrl}/#organization`,
   name: brandFullName,
   url: resolveSiteHomeUrl(),
  },
 };
}

function buildProductListItem(product, index, siteUrl) {
 const productUrl = `${siteUrl}/urunler/${product.slug}`;

 return {
  "@type": "ListItem",
  position: index + 1,
  name: product.name,
  url: productUrl,
 };
}

export function buildProductsItemListJsonLd({
 products,
 locale = "tr",
 listId = "site-products",
 listName,
} = {}) {
 if (!products?.length) return null;

 const siteUrl = resolveSiteUrl();
 const resolvedListName =
  listName ?? (locale === "en" ? "Products" : "Ürünler");

 return {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#${listId}`,
  name: resolvedListName,
  isPartOf: { "@id": `${siteUrl}/#website` },
  itemListElement: products.map((product, index) =>
   buildProductListItem(product, index, siteUrl)
  ),
 };
}

export function buildProductJsonLd(product, locale = "tr") {
 if (!product) return null;

 const siteUrl = resolveSiteUrl();
 const productUrl = `${siteUrl}/urunler/${product.slug}`;
 const images = (product.images ?? [])
  .map((image) => resolveAbsoluteImageUrl(image.url, siteUrl))
  .filter(Boolean);
 const offers = buildProductOffers(product, productUrl, siteUrl);
 const seoDescription = buildProductSeoDescription({
  name: product.name,
  nameEn: product.nameEn,
  locale,
 });

 if (!offers) return null;

 return {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${productUrl}#product`,
  name: product.name,
  ...(product.sku ? { sku: product.sku, mpn: product.sku } : {}),
  ...(seoDescription ? { description: seoDescription } : {}),
  url: productUrl,
  ...(images.length
   ? { image: images.length === 1 ? images[0] : images }
   : {}),
  brand: {
   "@type": "Brand",
   name: brandFullName,
  },
  manufacturer: {
   "@type": "Organization",
   "@id": `${siteUrl}/#organization`,
   name: brandFullName,
  },
  offers,
  isPartOf: { "@id": `${siteUrl}/#website` },
 };
}
