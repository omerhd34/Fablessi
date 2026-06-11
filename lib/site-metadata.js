import { brandName } from "@/lib/navigation";
import {
 trLocalSeoDescription,
 trLocalSeoKeywords,
 trLocalSeoTitle,
} from "@/lib/seo/local";

const siteDescription = trLocalSeoDescription;
const siteTitle = `${brandName} | ${trLocalSeoTitle}`;

const ogImagePath = "/og-image.jpg";
const ogImageWidth = 1200;
const ogImageHeight = 630;

export function resolveSiteUrl() {
 if (process.env.NEXT_PUBLIC_APP_URL) {
  return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
 }

 if (process.env.NODE_ENV === "production") {
  return "https://www.fablessi.com";
 }

 return "http://localhost:3000";
}

/** @type {import("next").Metadata} */
export const siteMetadata = {
 metadataBase: new URL(resolveSiteUrl()),
 title: {
  default: siteTitle,
  template: `%s | ${brandName}`,
 },
 description: siteDescription,
 authors: [{ name: "Ömer Halis Demir" }],
 creator: "Ömer Halis Demir",
 keywords: trLocalSeoKeywords,
 icons: {
  icon: "/brand/fablessi-logo.png",
  apple: "/brand/fablessi-logo.png",
 },
 openGraph: {
  type: "website",
  siteName: brandName,
  title: siteTitle,
  description: siteDescription,
  images: [
   {
    url: ogImagePath,
    width: ogImageWidth,
    height: ogImageHeight,
    type: "image/jpeg",
    alt: `${brandName} — İnegöl bahçe mobilyası ve bahçe takımı`,
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: siteTitle,
  description: siteDescription,
  images: [ogImagePath],
 },
};
