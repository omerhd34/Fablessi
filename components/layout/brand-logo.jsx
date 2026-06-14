"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import { brandSlug } from "@/lib/navigation";
import { brandLogoImageFilterClass } from "@/lib/layout/header-styles";
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
   className={cn(
    "group/logo inline-flex h-fit w-fit cursor-pointer items-center rounded-md px-3.5 py-2.5 -mx-3.5 -my-2.5 align-middle leading-none",
    className
   )}
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
    className={cn(
     "brand-logo-image m-0 block h-auto origin-left p-0 antialiased transition-[transform,filter] duration-300 ease-out font-features-['kern'_1] [text-rendering:geometricPrecision] group-hover/logo:scale-[1.08] group-focus-visible/logo:scale-[1.08] motion-safe:duration-650 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
     brandLogoImageFilterClass
    )}
   />
  </Link>
 );
}
