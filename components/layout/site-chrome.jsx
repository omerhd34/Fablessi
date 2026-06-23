"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";

const Footer = dynamic(() =>
 import("@/components/layout/footer").then((module) => module.Footer)
);

const ContactFloat = dynamic(
 () =>
  import("@/components/layout/contact-float").then((module) => module.ContactFloat),
 { ssr: false }
);

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
