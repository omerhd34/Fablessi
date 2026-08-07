import { seoSiteName } from "@/lib/seo/pages";
import {
 buildSiteOpenGraph,
 resolveSiteUrl,
 siteNameMetadata,
 siteOgImages,
 siteTwitterImages,
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

 const { images: openGraphImages, ...openGraphRest } = openGraph;
 const { images: twitterImages, ...twitterRest } = twitter;

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
   images: openGraphImages ?? siteOgImages,
   ...(path && !path.startsWith("http") ? { url: path } : {}),
   ...openGraphRest,
  }),
  twitter: {
   card: "summary_large_image",
   title: metaTitle,
   description,
   images: twitterImages ?? siteTwitterImages,
   ...twitterRest,
  },
  ...(keywords ? { keywords } : {}),
  robots: { index, follow: true },
 };
}
