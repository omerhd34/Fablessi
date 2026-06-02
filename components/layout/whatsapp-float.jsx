import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppHref } from "@/lib/site-contact";

export function WhatsAppFloat() {
 const href = getWhatsAppHref();
 if (!href) return null;

 return (
  <Link
   href={href}
   target="_blank"
   rel="noopener noreferrer"
   className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/0.18)] transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
   aria-label="WhatsApp ile iletişime geç"
  >
   <FaWhatsapp className="size-7 text-[#25D366]" aria-hidden />
  </Link>
 );
}
