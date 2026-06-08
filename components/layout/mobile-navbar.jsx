"use client";

import { Menu, Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MobileNavbar({ searchOpen, onSearchToggle, onMenuOpen }) {
 const isDesktopNav = useIsDesktopNav();

 if (isDesktopNav) return null;

 return (
  <div className="nav-compact container-premium" aria-label="Mobil menü">
   <div className="nav-compact-bar">
    <div className="nav-compact-bar__logo">
     <BrandLogoLink size="xs" className="nav-compact-bar__logo-brand max-w-full" />
    </div>

    <div className="nav-compact-bar__actions">
     <div className="nav-compact-search">
      <button
       type="button"
       onClick={onSearchToggle}
       className={cn(
        "header-pill-circle header-icon-btn size-10 cursor-pointer sm:size-12",
        searchOpen && "header-icon-btn--active"
       )}
       aria-label="Ara"
       aria-expanded={searchOpen}
      >
       <Search className="size-5 sm:size-[1.45rem]" aria-hidden />
      </button>
     </div>

     <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={onMenuOpen}
      className="header-pill-circle nav-compact-menu-btn size-10 shrink-0 hover:bg-transparent sm:size-14"
      aria-label="Menüyü aç"
     >
      <Menu className="size-5 sm:size-6" aria-hidden />
     </Button>
    </div>
   </div>
  </div>
 );
}
