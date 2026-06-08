"use client";

import Link from "next/link";
import { LuPhone } from "react-icons/lu";
import { TbBrandWhatsapp } from "react-icons/tb";
import { useTranslations } from "@/contexts/locale-provider";
import { getWhatsAppHref, sitePhoneHref } from "@/lib/site-contact";

const FLOAT_ICON_STROKE = 2.5;

export function ContactFloat() {
 const { t } = useTranslations();
 const whatsAppHref = getWhatsAppHref();
 const phoneHref = sitePhoneHref;

 if (!whatsAppHref && !phoneHref) return null;

 return (
  <div className="fixed right-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col gap-2.5 sm:right-6 sm:bottom-6 sm:gap-3">
   {whatsAppHref ? (
    <Link
     href={whatsAppHref}
     target="_blank"
     rel="noopener noreferrer"
     className="flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/15%)] transition-transform hover:scale-105 active:scale-95 sm:size-13"
     aria-label={t("contact.whatsapp")}
    >
     <TbBrandWhatsapp
      className="size-6 text-charcoal"
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </Link>
   ) : null}
   {phoneHref ? (
    <Link
     href={phoneHref}
     className="flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/15%)] transition-transform hover:scale-105 active:scale-95 sm:size-13"
     aria-label={t("contact.call")}
    >
     <LuPhone
      className="size-5 text-charcoal"
      strokeWidth={FLOAT_ICON_STROKE}
      aria-hidden
     />
    </Link>
   ) : null}
  </div>
 );
}
