import { getSitelinkSitemapEntries } from "@/lib/seo/sitelinks";
import { resolveSiteUrl } from "@/lib/site-metadata";

export default function sitemap() {
 const baseUrl = resolveSiteUrl();

 return getSitelinkSitemapEntries().map(({ path, changeFrequency, priority }) => ({
  url: path === "/" ? baseUrl : `${baseUrl}/${path}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
 }));
}
