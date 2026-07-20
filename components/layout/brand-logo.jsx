"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import { brandFullName } from "@/lib/brand";
import { brandLogoImageFilterClass } from "@/lib/layout/header-styles";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 292;
const LOGO_HEIGHT = 80;

const logoHeightClasses = {
 xs: "h-9",
 sm: "h-10",
 md: "h-11",
 lg: "h-12",
 xl: "h-16",
};

export const brandLogoMobileNavWrapperClass =
 "[&_.brand-logo-image]:h-11! sm:max-lg:[&_.brand-logo-image]:h-12! lg:[&_.brand-logo-image]:h-16! xl:[&_.brand-logo-image]:h-[4.25rem]!";

export const brandLogoMobileNavHomeWrapperClass =
 "[&_.brand-logo-image]:h-11.5! sm:max-lg:[&_.brand-logo-image]:h-12.5! lg:[&_.brand-logo-image]:h-16! xl:[&_.brand-logo-image]:h-[4.5rem]!";

export const brandLogoDesktopNavWrapperClass = "[&_.brand-logo-image]:h-16!";

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
   aria-label={`${brandFullName} - ${t("common.home")}`}
  >
   <Image
    src="/brand/logo-gardossi.png"
    alt={`${brandFullName} logo`}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    sizes="(min-width: 64rem) 292px, 260px"
    loading="eager"
    decoding="async"
    fetchPriority="high"
    draggable={false}
    className={cn(
     "brand-logo-image m-0 block w-auto max-w-none origin-left scale-100 p-0 antialiased transition-[scale,filter] duration-200 ease-out active:duration-75 font-features-['kern'_1] [text-rendering:geometricPrecision] group-hover/logo:scale-[1.08] group-focus-visible/logo:scale-[1.08] motion-reduce:duration-150",
     logoHeightClass,
     brandLogoImageFilterClass
    )}
   />
  </Link>
 );
}
