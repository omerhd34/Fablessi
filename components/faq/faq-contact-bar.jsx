import Link from "next/link";
import { FaWhatsapp, Mail, Phone } from "@/lib/icons";
import {
 getWhatsAppHref,
 siteEmail,
 sitePhone,
 sitePhoneHref,
} from "@/lib/site-contact";

export function FaqContactBar() {
 const whatsAppHref = getWhatsAppHref();

 return (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-body text-sm text-charcoal/75 md:gap-x-10 md:text-[0.9rem]">
   {sitePhoneHref ? (
    <Link
     href={sitePhoneHref}
     className="inline-flex items-center gap-2 transition-colors hover:text-charcoal"
    >
     <Phone className="size-4 shrink-0 text-charcoal/45" />
     <span>{sitePhone}</span>
    </Link>
   ) : null}

   {whatsAppHref ? (
    <Link
     href={whatsAppHref}
     target="_blank"
     rel="noopener noreferrer"
     className="inline-flex items-center gap-2 transition-colors hover:text-charcoal"
    >
     <FaWhatsapp className="size-4 shrink-0 text-charcoal/45" />
     <span>WhatsApp</span>
    </Link>
   ) : null}

   {siteEmail ? (
    <Link
     href={`mailto:${siteEmail}`}
     className="inline-flex items-center gap-2 transition-colors hover:text-charcoal"
    >
     <Mail className="size-4 shrink-0 text-charcoal/45" />
     <span>{siteEmail}</span>
    </Link>
   ) : null}
  </div>
 );
}
