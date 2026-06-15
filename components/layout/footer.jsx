"use client";

import Link from "next/link";
import { FaWhatsapp, Mail, MapPin, Phone } from "@/lib/icons";
import { flagshipStore } from "@/lib/stores";
import { SocialIcon } from "@/components/layout/social-icon";
import { useTranslations } from "@/contexts/locale-provider";
import { brandName } from "@/lib/navigation";
import {
 getSiteWorkingHours,
 getWhatsAppHref,
 siteEmail,
 sitePhone,
 sitePhoneHref,
 socialLinks,
} from "@/lib/site-contact";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

const footerContactIconLinkClass =
 "inline-flex scale-100 text-charcoal/70 transition-[scale,color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:text-charcoal motion-reduce:duration-150";

function FooterColumn({ title, titleHref, children, className }) {
 const titleClassName =
  "font-body text-[13px] font-semibold tracking-wide text-charcoal transition-colors hover:text-charcoal/80";

 return (
  <div className={cn("flex flex-col gap-5", className)}>
   {titleHref ? (
    <Link href={titleHref} className={titleClassName}>
     {title}
    </Link>
   ) : (
    <h2 className={titleClassName}>{title}</h2>
   )}
   <div className="flex flex-1 flex-col">{children}</div>
  </div>
 );
}

function FooterLinkList({ links }) {
 return (
  <ul className="flex flex-col gap-3">
   {links.map((item) => (
    <li key={item.href}>
     <Link
      href={item.href}
      className="font-body text-[13px] leading-relaxed text-charcoal/75 transition-colors hover:text-charcoal"
     >
      {item.label}
     </Link>
    </li>
   ))}
  </ul>
 );
}

export function Footer() {
 const { navigation, t, locale, dictionary } = useTranslations();
 const {
  footerExploreLinks,
  footerCategoryLinks,
  footerCustomerServiceLinks,
 } = navigation;
 const whatsAppHref = getWhatsAppHref();
 const year = new Date().getFullYear();
 const workingHours = getSiteWorkingHours(locale, dictionary);

 return (
  <footer className="mt-4 rounded-t-[2rem] bg-white pt-14 shadow-[0_-4px_32px_rgb(0_0_0/4%)] lg:pt-16">
   <div className={containerPremiumClass}>
    <div className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 xl:gap-x-16">
     <FooterColumn title={t("footer.categories")}>
      <FooterLinkList links={footerCategoryLinks} />
     </FooterColumn>

     <FooterColumn title={t("footer.explore")}>
      <FooterLinkList links={footerExploreLinks} />
     </FooterColumn>

     <FooterColumn title={t("footer.helpPolicies")}>
      <FooterLinkList links={footerCustomerServiceLinks} />
     </FooterColumn>

     <FooterColumn
      title={t("footer.getInTouch")}
      titleHref="/iletisim"
     >
      <div className="flex flex-col gap-5">
       <div className="space-y-1.5 font-body text-[13px] leading-relaxed text-charcoal/70">
        {workingHours.map((row) => (
         <p key={row.label}>
          {row.label}: {row.hours}
         </p>
        ))}
       </div>

       <div className="flex flex-wrap items-center gap-5">
        {sitePhoneHref ? (
         <Link
          href={sitePhoneHref}
          className={footerContactIconLinkClass}
          aria-label={t("footer.phone", { phone: sitePhone })}
         >
          <Phone className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {whatsAppHref ? (
         <Link
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className={footerContactIconLinkClass}
          aria-label={t("contact.whatsapp")}
         >
          <FaWhatsapp className="size-4" aria-hidden />
         </Link>
        ) : null}
        {siteEmail ? (
         <Link
          href={`mailto:${siteEmail}`}
          className={footerContactIconLinkClass}
          aria-label={t("footer.email", { email: siteEmail })}
         >
          <Mail className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {flagshipStore.mapUrl ? (
         <Link
          href={flagshipStore.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={footerContactIconLinkClass}
          aria-label={t("footer.location")}
         >
          <MapPin className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {socialLinks.map((item) => (
         <Link
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={footerContactIconLinkClass}
          aria-label={item.label}
         >
          <SocialIcon label={item.label} />
         </Link>
        ))}
       </div>
      </div>
     </FooterColumn>
    </div>

    <div className="mt-20 border-t border-charcoal/8 pt-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:mt-14 lg:mt-16 lg:pt-10">
     <div className="flex min-h-(--glass-float-size) pr-[calc(1.25rem+var(--glass-float-size)+0.75rem)] max-sm:flex-col max-sm:justify-end max-sm:gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <p className="font-body text-[12px] text-charcoal/55">
       {year} © {brandName}
      </p>
      <p className="font-body text-[12px] text-charcoal/55 sm:text-right">
       {t("footer.siteDeveloper")}{" "}
       <Link
        href="https://www.veltstack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-charcoal/70 underline underline-offset-2 transition-colors hover:text-charcoal"
       >
        VeltStack
       </Link>
      </p>
     </div>
    </div>
   </div>
  </footer>
 );
}
