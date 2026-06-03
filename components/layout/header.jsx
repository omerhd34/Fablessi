/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { HeaderSearchBar } from "@/components/layout/header-search-bar";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 1;

export function Header() {
 const pathname = usePathname();
 const [scrolled, setScrolled] = useState(false);
 const [productsMenuOpen, setProductsMenuOpen] = useState(false);
 const [searchOpen, setSearchOpen] = useState(false);
 const isDesktopNav = useIsDesktopNav();

 const isHome = pathname === "/";
 const isHeroOverlayPage = isHome;
 const compact = scrolled;

 const toggleSearch = () => {
  setSearchOpen((prev) => {
   const next = !prev;
   if (next) {
    setProductsMenuOpen(false);
   }
   return next;
  });
 };

 useEffect(() => {
  const onScroll = () => {
   const next = window.scrollY > SCROLL_THRESHOLD;
   setScrolled(next);
   if (next) {
    setProductsMenuOpen(false);
   }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
 }, []);

 useEffect(() => {
  const root = document.documentElement;
  if (isDesktopNav && compact) {
   root.style.setProperty("--header-height-desktop", "3.5rem");
  } else {
   root.style.setProperty("--header-height-desktop", "8.875rem");
  }
 }, [compact, isDesktopNav]);

 useEffect(() => {
  setProductsMenuOpen(false);
  setSearchOpen(false);
 }, [pathname]);

 useEffect(() => {
  if (!searchOpen) return;

  const onKeyDown = (event) => {
   if (event.key === "Escape") {
    setSearchOpen(false);
   }
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
 }, [searchOpen]);

 return (
  <header
   data-search-open={searchOpen ? "true" : "false"}
   data-compact={compact ? "true" : "false"}
   className={cn(
    "site-header fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-300 ease-out",
    compact
     ? "bg-(--header-compact-bg) shadow-sm shadow-black/10"
     : isHeroOverlayPage
      ? "bg-transparent shadow-none"
      : "bg-black shadow-md shadow-black/25"
   )}
   onMouseLeave={(event) => {
    const related = event.relatedTarget;
    if (related instanceof Node && event.currentTarget.contains(related)) {
     return;
    }
    setProductsMenuOpen(false);
   }}
  >
   <Navbar
    compact={compact}
    searchOpen={searchOpen}
    productsMenuOpen={productsMenuOpen}
    onProductsMenuOpenChange={setProductsMenuOpen}
    onSearchToggle={toggleSearch}
    onSearchClose={() => setSearchOpen(false)}
   />
   <HeaderSearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
  </header>
 );
}
