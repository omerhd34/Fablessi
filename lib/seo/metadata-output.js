import { seoSiteName } from "@/lib/seo/pages";
import {
 buildSiteOpenGraph,
 resolveSiteUrl,
 siteNameMetadata,
} from "@/lib/site-metadata";

export function buildSeoMetadataOutput({
 metaTitle,
 description,
 path,
 keywords,
 index = true,
 openGraph = {},
 twitter = {},
}) {
 const siteUrl = resolveSiteUrl();
 const canonical = path
  ? path.startsWith("http")
   ? path
   : `${siteUrl}${path}`
  : null;

 return {
  ...siteNameMetadata,
  metadataBase: new URL(siteUrl),
  title: { absolute: metaTitle },
  description,
  ...(canonical ? { alternates: { canonical } } : {}),
  openGraph: buildSiteOpenGraph({
   title: metaTitle,
   description,
   siteName: seoSiteName,
   ...(path && !path.startsWith("http") ? { url: path } : {}),
   ...openGraph,
  }),
  twitter: {
   card: "summary_large_image",
   title: metaTitle,
   description,
   ...twitter,
  },
  ...(keywords ? { keywords } : {}),
  robots: { index, follow: true },
 };
}
