import { getGoogleSitelinks } from "@/lib/seo/google-snippets";

export const FEATURED_SECTION_ID = "one-cikan-urunler";

export function getSitelinks(locale = "tr") {
 const googleSitelinks = getGoogleSitelinks(locale);
 if (googleSitelinks.length > 0) return googleSitelinks;

 return [{ name: "Ürünler", href: "/urunler" }];
}

export { getSitelinkSitemapEntries } from "@/lib/seo/sitemap-entries";
