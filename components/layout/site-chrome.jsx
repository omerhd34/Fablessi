"use client";

import { usePathname } from "next/navigation";
import { ContactFloat } from "@/components/layout/contact-float";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function SiteChrome() {
 const pathname = usePathname();
 const isAdmin = pathname?.startsWith("/admin");

 if (isAdmin) return null;

 return (
  <>
   <Header />
   <Footer />
   <ContactFloat />
  </>
 );
}
