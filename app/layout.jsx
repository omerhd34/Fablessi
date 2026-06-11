import { Montserrat, Poppins } from "next/font/google";
import "@/app/styles/base.css";
import "@/app/styles/layout.css";
import "@/app/styles/shared.css";
import { MainShell } from "@/components/layout/main-shell";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "@/contexts/favorites-provider";
import { LocaleProvider } from "@/contexts/locale-provider";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import { getServerDictionary } from "@/lib/i18n/server";
import { brandName } from "@/lib/navigation";
import { buildOrganizationJsonLd } from "@/lib/seo/json-ld";
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
 const title = `${brandName} | ${dictionary.metadata.title}`;
 const description = dictionary.metadata.description;
 const openGraphLocale = locale === "en" ? "en_US" : "tr_TR";

 return {
  ...siteMetadata,
  title: {
   default: title,
   template: siteMetadata.title.template,
  },
  description,
  keywords: dictionary.metadata.keywords ?? siteMetadata.keywords,
  alternates: {
   canonical: "/",
  },
  openGraph: {
   ...siteMetadata.openGraph,
   title,
   description,
   locale: openGraphLocale,
   url: "/",
  },
  twitter: {
   ...siteMetadata.twitter,
   title,
   description,
  },
 };
}

export default async function RootLayout({ children }) {
 const { locale, dictionary } = await getServerDictionary();
 const menuGroups = await getCategoryGroupsForMenu(locale);
 const organizationJsonLd = buildOrganizationJsonLd(locale);

 return (
  <html
   lang={locale}
   className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
  >
   <body className="min-h-full flex flex-col font-sans">
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
    <LocaleProvider locale={locale} dictionary={dictionary} menuGroups={menuGroups}>
     <FavoritesProvider>
      <TooltipProvider>
       <MainShell>{children}</MainShell>
       <SiteChrome />
       <Toaster position="bottom-center" gap={10} visibleToasts={1} />
      </TooltipProvider>
     </FavoritesProvider>
    </LocaleProvider>
   </body>
  </html>
 );
}
