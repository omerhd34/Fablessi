"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { useTranslations } from "@/contexts/locale-provider";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import {
 headerIconBtnClass,
 headerPillCircleClass,
 pillCircleIconActiveClass,
} from "@/lib/layout/header-styles";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

const compactIconClass = "size-[var(--glass-mobile-icon-size)] text-white/96";
const compactBtnClass = cn(
 headerPillCircleClass,
 headerIconBtnClass,
 "size-[var(--glass-mobile-btn-size)] shrink-0 cursor-pointer p-0 text-white/96 hover:opacity-100"
);

export function MobileNavbar({ searchOpen, onSearchToggle, onMenuOpen }) {
 const isDesktopNav = useIsDesktopNav();
 const pathname = usePathname();
 const isHome = pathname === "/";
 const { t } = useTranslations();

 if (isDesktopNav) return null;

 const searchButton = (
  <button
   type="button"
   onClick={onSearchToggle}
   className={cn(compactBtnClass, searchOpen && pillCircleIconActiveClass)}
   aria-label={t("common.search")}
   aria-expanded={searchOpen}
  >
   <Search className={compactIconClass} aria-hidden />
  </button>
 );

 const menuButton = (
  <button
   type="button"
   onClick={onMenuOpen}
   className={compactBtnClass}
   aria-label={t("nav.openMenu")}
  >
   <Menu className={compactIconClass} aria-hidden />
  </button>
 );

 return (
  <div
   className={cn(containerPremiumClass, "lg:hidden")}
   aria-label={t("nav.mobileMenu")}
  >
   <div className="flex min-h-[calc(var(--glass-mobile-btn-size)+0.875rem)] items-center justify-between gap-1.5 pt-3.5 sm:max-lg:min-h-[calc(var(--glass-mobile-btn-size)+1rem)] sm:max-lg:gap-2 sm:max-lg:pt-4">
    <div
     className={cn(
      "block h-fit w-fit flex-none self-center p-0 leading-none [&_.brand-logo-image]:h-9! sm:max-lg:[&_.brand-logo-image]:!h-10",
      isHome && "min-w-0 shrink self-center [&_.brand-logo-image]:h-[2.375rem]! sm:max-lg:[&_.brand-logo-image]:!h-[2.625rem]"
     )}
    >
     <BrandLogoLink size="md" />
    </div>

    <div className="flex shrink-0 flex-nowrap items-center gap-1.5 sm:max-lg:gap-2">
     {searchButton}
     {menuButton}
    </div>
   </div>
  </div>
 );
}
