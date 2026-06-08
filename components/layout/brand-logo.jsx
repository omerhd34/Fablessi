"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import { brandSlug } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const sizeClasses = {
 xs: "brand-logo-lockup--xs",
 sm: "brand-logo-lockup--sm",
 md: "brand-logo-lockup--md",
 lg: "brand-logo-lockup--lg",
 xl: "brand-logo-lockup--xl",
};

export function BrandLogoLink({ href = "/", size = "md", className }) {
 const { t } = useTranslations();

 return (
  <Link
   href={href}
   className={cn("group inline-flex shrink-0", className)}
   aria-label={`${brandSlug} — ${t("common.home")}`}
  >
   <span
    className={cn(
     "brand-logo-lockup brand-logo transition-opacity duration-200 group-hover:opacity-90",
     sizeClasses[size]
    )}
   >
    <span className="brand-logo-wordmark">{brandSlug}</span>
   </span>
  </Link>
 );
}
