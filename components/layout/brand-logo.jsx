"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import { brandSlug } from "@/lib/navigation";
import { brandLogoImageFilterClass } from "@/lib/layout/header-styles";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 1168;
const LOGO_HEIGHT = 268;

const logoHeightClasses = {
 xs: "h-8",
 sm: "h-9",
 md: "h-10",
 lg: "h-11",
 xl: "h-14",
};

export const brandLogoMobileNavWrapperClass =
 "[&_.brand-logo-image]:h-9! sm:max-lg:[&_.brand-logo-image]:h-10! lg:[&_.brand-logo-image]:h-14!";

export const brandLogoMobileNavHomeWrapperClass =
 "[&_.brand-logo-image]:h-9.5! sm:max-lg:[&_.brand-logo-image]:h-10.5! lg:[&_.brand-logo-image]:h-14!";

export const brandLogoDesktopNavWrapperClass = "[&_.brand-logo-image]:h-14!";

export function BrandLogoLink({ href = "/", size = "md", className }) {
 const { t } = useTranslations();
 const logoHeightClass = logoHeightClasses[size] ?? logoHeightClasses.md;

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
    className={cn(
     "brand-logo-image m-0 block w-auto max-w-none origin-left scale-100 p-0 antialiased transition-[scale,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] font-features-['kern'_1] [text-rendering:geometricPrecision] group-hover/logo:scale-[1.08] group-focus-visible/logo:scale-[1.08] motion-reduce:duration-150",
     logoHeightClass,
     brandLogoImageFilterClass
    )}
   />
  </Link>
 );
}
