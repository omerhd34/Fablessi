"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import { brandSlug } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 1168;
const LOGO_HEIGHT = 268;

const logoHeights = {
 xs: "2rem",
 sm: "2.25rem",
 md: "2.5rem",
 lg: "2.75rem",
 xl: "3rem",
};

export function BrandLogoLink({ href = "/", size = "md", className }) {
 const { t } = useTranslations();
 const logoHeight = logoHeights[size] ?? logoHeights.md;

 return (
  <Link
   href={href}
   className={cn("brand-logo-link", className)}
   aria-label={`${brandSlug} — ${t("common.home")}`}
  >
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img
    src="/brand/logo.png"
    alt={`${brandSlug} logo`}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    decoding="async"
    fetchPriority="high"
    draggable={false}
    style={{
     height: logoHeight,
     width: "auto",
     maxWidth: "none",
    }}
    className="brand-logo-image brand-logo"
   />
  </Link>
 );
}
