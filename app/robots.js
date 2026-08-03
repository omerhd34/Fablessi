import { resolveSiteUrl } from "@/lib/site-metadata";

export default function robots() {
 const baseUrl = resolveSiteUrl();

 return {
  rules: [
   {
    userAgent: "*",
    allow: "/",
    disallow: ["/admin/", "/api/", "/slayts/"],
   },
  ],
  sitemap: `${baseUrl}/sitemap.xml`,
  host: baseUrl,
 };
}
