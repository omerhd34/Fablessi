import { buildSitemapUrl, getAllSitemapEntries } from "@/lib/seo/sitemap-entries";
import { resolveSiteUrl } from "@/lib/site-metadata";

export const revalidate = 3600;

export default async function sitemap() {
 const baseUrl = resolveSiteUrl();
 const entries = await getAllSitemapEntries();

 return entries.map(({ path, changeFrequency, priority, lastModified }) => ({
  url: buildSitemapUrl(baseUrl, path),
  lastModified: lastModified ?? new Date(),
  changeFrequency,
  priority,
 }));
}
