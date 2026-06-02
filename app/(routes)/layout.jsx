import { Cinzel } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { TooltipProvider } from "@/components/ui/tooltip";

const cinzel = Cinzel({
 variable: "--font-cinzel",
 subsets: ["latin", "latin-ext"],
 weight: ["400", "500", "600"],
 display: "swap",
});

const adobeFontsKit = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT;

export const metadata = {
 title: {
  default: "Mobilya | Premium Mobilya Portfolyosu",
  template: "%s | Mobilya",
 },
 description:
  "Koleksiyonlar, ürün kataloğu ve mimari ilham — premium mobilya portfolyo vitrini.",
};

export default function RootLayout({ children }) {
 return (
  <html
   lang="tr"
   className={`${cinzel.variable} h-full antialiased`}
  >
   <head>
    {adobeFontsKit ? (
     <link
      rel="stylesheet"
      href={`https://use.typekit.net/${adobeFontsKit}.css`}
     />
    ) : null}
   </head>
   <body className="min-h-full flex flex-col font-sans">
    <TooltipProvider>
     <Header />
     <main className="flex-1">{children}</main>
     <Footer />
     <WhatsAppFloat />
    </TooltipProvider>
   </body>
  </html>
 );
}
