import { brandName } from "@/lib/navigation";
import { getFlagshipStore } from "@/lib/stores";
import {
 enLocalSeoDescription,
 trLocalSeoDescription,
} from "@/lib/seo/local";
import { resolveSiteUrl } from "@/lib/site-metadata";
import { getSitelinks } from "@/lib/seo/sitelinks";
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
  name: brandName,
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

 return {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: brandName,
  alternateName: ["Fablessi Outdoor Living"],
  url: siteUrl,
  publisher: {
   "@type": "Organization",
   "@id": `${siteUrl}/#organization`,
   name: brandName,
   url: siteUrl,
   logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/brand/favicon-512.png`,
    width: 512,
    height: 512,
   },
  },
 };
}

export function buildSiteNavigationJsonLd(dictionary) {
 const siteUrl = resolveSiteUrl();
 const sitelinks = getSitelinks(dictionary);

 return {
  "@context": "https://schema.org",
  "@graph": sitelinks.map((link) => ({
   "@type": "SiteNavigationElement",
   name: link.name,
   url: `${siteUrl}${link.href}`,
  })),
 };
}
