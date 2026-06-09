import { Montserrat, Poppins } from "next/font/google";
import "@/app/styles/base.css";
import "@/app/styles/layout.css";
import "@/app/styles/shared.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MainShell } from "@/components/layout/main-shell";
import { ContactFloat } from "@/components/layout/contact-float";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "@/contexts/favorites-provider";
import { LocaleProvider } from "@/contexts/locale-provider";
import { getServerDictionary } from "@/lib/i18n/server";
import { brandName } from "@/lib/navigation";

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
 const { dictionary } = await getServerDictionary();

 return {
  icons: {
   icon: "/brand/fablessi-logo.png",
   apple: "/brand/fablessi-logo.png",
  },
  title: {
   default: `${brandName} | ${dictionary.metadata.title}`,
   template: `%s | ${brandName}`,
  },
  description: dictionary.metadata.description,
  keywords: [
   "bahçe mobilyası",
   "garden furniture",
   "dış mekan mobilya",
   "outdoor furniture",
   "Fablessi",
   "İnegöl",
   "premium bahçe mobilyaları",
  ],
 };
}

export default async function RootLayout({ children }) {
 const { locale, dictionary } = await getServerDictionary();

 return (
  <html
   lang={locale}
   className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
  >
   <body className="min-h-full flex flex-col font-sans">
    <LocaleProvider locale={locale} dictionary={dictionary}>
     <FavoritesProvider>
      <TooltipProvider>
       <MainShell>{children}</MainShell>
       <Header />
       <Footer />
       <ContactFloat />
       <Toaster position="bottom-center" gap={10} visibleToasts={1} />
      </TooltipProvider>
     </FavoritesProvider>
    </LocaleProvider>
   </body>
  </html>
 );
}
