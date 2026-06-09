import { brandName } from "@/lib/navigation";

const siteDescription =
 "İnegöl merkezli Fablessi — bahçe mobilyalarında kurumsal katalog ve koleksiyon vitrini. Premium, minimalist ve zamansız dış mekan tasarımları.";

const siteTitle = `${brandName} | Premium Bahçe Mobilyaları`;

/** @type {import("next").Metadata} */
export const siteMetadata = {
 metadataBase: new URL(
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
 ),
 title: {
  default: siteTitle,
  template: `%s | ${brandName}`,
 },
 description: siteDescription,
 authors: [{ name: "Ömer Halis Demir" }],
 creator: "Ömer Halis Demir",
 keywords: [
  "bahçe mobilyası",
  "garden furniture",
  "dış mekan mobilya",
  "outdoor furniture",
  "Fablessi",
  "İnegöl",
  "premium bahçe mobilyaları",
 ],
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
    url: "/Fablessi-Premium.png",
    alt: `${brandName} — Outdoor Living`,
   },
  ],
 },
 twitter: {
  card: "summary",
  title: siteTitle,
  description: siteDescription,
  images: ["/brand/fablessi-logo.png"],
 },
};
