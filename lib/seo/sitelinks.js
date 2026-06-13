import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

export const FEATURED_SECTION_ID = "one-cikan-urunler";

export function getSitelinks(dictionary) {
 const categoryLinks = productMenuGroupsData.map((group) => ({
  name: dictionary.categories[group.slug] ?? group.slug,
  href: group.href,
 }));

 return [
  { name: dictionary.nav.products, href: "/urunler" },
  { name: dictionary.home.featuredTitle, href: `/#${FEATURED_SECTION_ID}` },
  ...categoryLinks,
 ];
}

export function getSitelinkSitemapEntries() {
 return [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/urunler", priority: 0.9, changeFrequency: "daily" },
  ...productMenuGroupsData.map((group) => ({
   path: group.href.replace(/^\//, ""),
   priority: 0.8,
   changeFrequency: "weekly",
  })),
 ];
}
