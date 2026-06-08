/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { ProductsMegaMenu } from "@/components/layout/products-mega-menu";
import { headerQuickLinks } from "@/lib/navigation";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";

export function DesktopNavbar({
 productsMenuOpen = false,
 onProductsMenuOpenChange,
 onSearchToggle,
 onSearchClose,
 searchOpen,
 onMenuOpen,
}) {
 const pathname = usePathname();
 const isDesktopNav = useIsDesktopNav();
 const navRef = useRef(null);

 const setProductsOpenState = (open) => {
  onProductsMenuOpenChange?.(open);
  if (open) onSearchClose?.();
 };

 const toggleProductsMenu = () => {
  setProductsOpenState(!productsMenuOpen);
 };

 useEffect(() => {
  if (!productsMenuOpen) return;

  const onPointerDown = (event) => {
   if (navRef.current?.contains(event.target)) return;
   setProductsOpenState(false);
  };

  document.addEventListener("pointerdown", onPointerDown);
  return () => document.removeEventListener("pointerdown", onPointerDown);
 }, [productsMenuOpen]);

 const productsActive =
  pathname === "/urunler" ||
  pathname.startsWith("/urunler/") ||
  productsMenuOpen;

 if (!isDesktopNav) return null;

 return (
  <div ref={navRef} className="nav-desktop relative" aria-label="Masaüstü menü">
   <div className="container-premium nav-desktop-bar">
    <BrandLogoLink size="lg" className="min-w-0 shrink" />

    <div className="nav-desktop-bar__actions">
     <div className="header-pill flex h-11 items-center px-1.5 lg:h-12 lg:px-2 xl:h-[3.35rem]">
      {headerQuickLinks.map((item) =>
       item.megaMenu === "products" ? (
        <button
         key={item.href}
         type="button"
         onClick={toggleProductsMenu}
         aria-expanded={productsMenuOpen}
         aria-haspopup="true"
         className={cn(
          "header-pill-link cursor-pointer px-3 py-2 text-[0.9375rem] lg:px-4 lg:py-2.5 lg:text-base xl:px-5 xl:py-3",
          productsActive && "font-semibold"
         )}
        >
         {item.label}
        </button>
       ) : (
        <Link
         key={item.href}
         href={item.href}
         onClick={() => setProductsOpenState(false)}
         className="header-pill-link px-4 py-2.5 xl:px-5 xl:py-3"
        >
         {item.label}
        </Link>
       )
      )}
     </div>

     <div className="header-pill flex h-11 items-center px-1.5 lg:h-12 lg:px-2 xl:h-[3.35rem]">
      <button
       type="button"
       onClick={onSearchToggle}
       className={cn(
        "header-icon-btn size-10 cursor-pointer rounded-full lg:size-11 xl:size-12",
        searchOpen && "header-icon-btn--active"
       )}
       aria-label="Ara"
       aria-expanded={searchOpen}
      >
       <Search className="size-[1.45rem]" />
      </button>
     </div>

     <button
      type="button"
      className="header-pill-circle header-pill-link size-11 shrink-0 cursor-pointer text-sm font-semibold lg:size-12 lg:text-[0.9375rem] xl:size-[3.35rem]"
      aria-label="Dil: Türkçe"
     >
      TR
     </button>

     <button
      type="button"
      onClick={onMenuOpen}
      className="header-pill-circle header-icon-btn size-11 shrink-0 cursor-pointer lg:size-12 xl:size-[3.35rem]"
      aria-label="Menüyü aç"
     >
      <Menu className="size-[1.45rem]" />
     </button>
    </div>
   </div>

   <ProductsMegaMenu open={productsMenuOpen} />
  </div>
 );
}
