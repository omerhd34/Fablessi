import { Montserrat, Poppins } from "next/font/google";
import "@/app/styles/base.css";
import { MainShell } from "@/components/layout/main-shell";
import { SiteChrome } from "@/components/layout/site-chrome";
import { AppToaster } from "@/components/ui/app-toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "@/contexts/favorites-provider";
import { LocaleProvider } from "@/contexts/locale-provider";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import { getServerDictionary } from "@/lib/i18n/server";
import { buildSiteStructuredDataGraph } from "@/lib/seo/json-ld";
import { buildPageSeoMetadata } from "@/lib/seo/page-metadata-builders";
import { buildSeoMetadataOutput } from "@/lib/seo/metadata-output";
import { siteMetadata } from "@/lib/site-metadata";

const montserrat = Montserrat({
 variable: "--font-montserrat",
 subsets: ["latin", "latin-ext"],
 weight: ["400", "500", "600", "700"],
 display: "swap",
});

const poppins = Poppins({
 variable: "--font-poppins",
 subsets: ["latin", "latin-ext"],
 weight: ["800"],
 display: "swap",
});

export async function generateMetadata() {
 const { dictionary, locale } = await getServerDictionary();
 const seo = buildPageSeoMetadata("home", locale);
 const openGraphLocale = locale === "en" ? "en_US" : "tr_TR";
 const seoOutput = buildSeoMetadataOutput({
  metaTitle: seo.metaTitle,
  description: seo.description,
  path: "/",
  keywords: dictionary.metadata.keywords ?? siteMetadata.keywords,
  index: true,
  openGraph: { locale: openGraphLocale },
 });

 return {
  ...siteMetadata,
  ...seoOutput,
  openGraph: {
   ...siteMetadata.openGraph,
   ...seoOutput.openGraph,
  },
  twitter: {
   ...siteMetadata.twitter,
   ...seoOutput.twitter,
  },
 };
}

export const revalidate = 0;

export default async function RootLayout({ children }) {
 const { locale, dictionary } = await getServerDictionary();
 const menuGroups = await getCategoryGroupsForMenu(locale);
 const siteStructuredDataGraph = buildSiteStructuredDataGraph(locale);

 return (
  <html
   lang={locale}
   data-scroll-behavior="smooth"
   data-toast-layout="fab"
   className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
  >
   <head>
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredDataGraph) }}
    />
   </head>
   <body className="min-h-full flex flex-col font-sans">
    <LocaleProvider locale={locale} dictionary={dictionary} menuGroups={menuGroups}>
     <FavoritesProvider>
      <TooltipProvider>
       <MainShell>{children}</MainShell>
       <SiteChrome />
       <AppToaster />
      </TooltipProvider>
     </FavoritesProvider>
    </LocaleProvider>
   </body>
  </html>
 );
}
