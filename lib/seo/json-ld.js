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
  url: siteUrl,
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

export function buildWebSiteJsonLd() {
 const siteUrl = resolveSiteUrl();
 const siteHomeUrl = resolveSiteHomeUrl();

 return {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: brandFullName,
  alternateName: [brandName, "fablessi.com"],
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
