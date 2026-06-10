"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "@/lib/icons";
import { FavoritesLink } from "@/components/favorites/favorites-link";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { useTranslations } from "@/contexts/locale-provider";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";

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
   className={cn(
    "header-icon-btn shrink-0 cursor-pointer",
    isHome
     ? "nav-compact-icon-btn"
     : "header-pill-circle nav-compact-search-btn",
    searchOpen && "header-icon-btn--active"
   )}
   aria-label={t("common.search")}
   aria-expanded={searchOpen}
  >
   <Search
    className={cn(
     isHome ? "nav-compact-icon-btn__icon" : "nav-compact-search-btn__icon"
    )}
    aria-hidden
   />
  </button>
 );

 const menuButton = (
  <button
   type="button"
   onClick={onMenuOpen}
   className="header-pill-circle header-icon-btn nav-compact-menu-btn shrink-0 cursor-pointer"
   aria-label={t("nav.openMenu")}
  >
   <Menu className="nav-compact-menu-btn__icon" aria-hidden />
  </button>
 );

 return (
  <div
   className={cn("nav-compact container-premium", isHome && "nav-compact--home")}
   aria-label={t("nav.mobileMenu")}
  >
   <div className={cn("nav-compact-bar", isHome && "nav-compact-bar--home")}>
    {isHome ? (
     <div className="header-pill nav-compact-logo-pill">
      <BrandLogoLink size="sm" />
     </div>
    ) : (
     <div className="nav-compact-bar__logo">
      <BrandLogoLink size="md" />
     </div>
    )}

    <div className="nav-compact-bar__actions">
     {isHome ? (
      <>
       <div className="header-pill nav-compact-actions-pill">
        {searchButton}
        <FavoritesLink
         className="nav-compact-icon-btn"
         iconClassName="nav-compact-icon-btn__icon"
        />
       </div>
       {menuButton}
      </>
     ) : (
      <>
       {searchButton}
       {menuButton}
      </>
     )}
    </div>
   </div>
  </div>
 );
}
