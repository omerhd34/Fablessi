import { brandFullName, brandName } from "@/lib/navigation";
import { getFlagshipStore } from "@/lib/stores";
import {
 enLocalSeoDescription,
 trLocalSeoDescription,
} from "@/lib/seo/local";
import { resolveSiteHomeUrl, resolveSiteUrl } from "@/lib/site-metadata";
import { getSitelinks, FEATURED_SECTION_ID } from "@/lib/seo/sitelinks";
import { getGoogleFeaturedSectionMeta } from "@/lib/seo/google-snippets";
import { siteEmail, sitePhoneHref } from "@/lib/site-contact";
import { getPrimaryImageUrl, getProductDisplayPrice } from "@/lib/product-utils";

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
  alternateName: [brandName],
  url: siteHomeUrl,
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
 const sitelinks = getSitelinks(locale);

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

function resolveAbsoluteImageUrl(url, siteUrl) {
 if (!url) return undefined;
 if (url.startsWith("http://") || url.startsWith("https://")) return url;
 return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

function buildProductOffers(product, productUrl) {
 const price = getProductDisplayPrice(product);
 if (price == null) return null;

 return {
  "@type": "Offer",
  url: productUrl,
  priceCurrency: "TRY",
  price,
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
 };
}

function buildProductSchemaFields(product, productUrl, siteUrl) {
 const imageUrl = resolveAbsoluteImageUrl(getPrimaryImageUrl(product), siteUrl);
 const offers = buildProductOffers(product, productUrl);

 if (!offers) return null;

 return {
  "@type": "Product",
  name: product.name,
  url: productUrl,
  ...(imageUrl ? { image: imageUrl } : {}),
  brand: {
   "@type": "Brand",
   name: brandFullName,
  },
  offers,
 };
}

function buildProductListItem(product, index, siteUrl) {
 const productUrl = `${siteUrl}/urunler/${product.slug}`;
 const productSchema = buildProductSchemaFields(product, productUrl, siteUrl);

 if (!productSchema) {
  return {
   "@type": "ListItem",
   position: index + 1,
   name: product.name,
   url: productUrl,
  };
 }

 return {
  "@type": "ListItem",
  position: index + 1,
  item: productSchema,
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

/** @deprecated Use buildProductsItemListJsonLd */
export function buildFeaturedProductsJsonLd(products, locale = "tr") {
 return buildProductsItemListJsonLd({
  products,
  locale,
  listId: "one-cikan-urunler",
  listName: locale === "en" ? "Featured Products" : "Öne Çıkan Ürünler",
 });
}

export function buildProductJsonLd(product, locale = "tr") {
 if (!product) return null;

 const siteUrl = resolveSiteUrl();
 const productUrl = `${siteUrl}/urunler/${product.slug}`;
 const images = (product.images ?? [])
  .map((image) => resolveAbsoluteImageUrl(image.url, siteUrl))
  .filter(Boolean);
 const offers = buildProductOffers(product, productUrl);

 if (!offers) return null;

 return {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${productUrl}#product`,
  name: product.name,
  ...(product.description ? { description: product.description } : {}),
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
