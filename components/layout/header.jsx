/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { HeaderSearchBar } from "@/components/layout/header-search-bar";
import { cn } from "@/lib/utils";

const HERO_SELECTORS = ".hero-carousel, .page-header-bleed, .faq-hero";

function getHeaderHideThreshold() {
 const header = document.querySelector(".site-header");
 const headerHeight = header
  ? Math.ceil(header.getBoundingClientRect().height)
  : 0;

 return Math.max(80, headerHeight + 16);
}

function isLogoOverHero() {
 const hero = document.querySelector(HERO_SELECTORS);
 if (!hero) return false;

 const logos = document.querySelectorAll(".site-header .brand-logo-image");
 let logo = null;

 for (const candidate of logos) {
  const rect = candidate.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
   logo = candidate;
   break;
  }
 }

 if (!logo) return true;

 const logoRect = logo.getBoundingClientRect();
 const heroRect = hero.getBoundingClientRect();
 const logoCenterY = logoRect.top + logoRect.height / 2;

 return logoCenterY >= heroRect.top && logoCenterY <= heroRect.bottom;
}

export function Header() {
 const pathname = usePathname();
 const [scrolled, setScrolled] = useState(false);
 const [heroOverlay, setHeroOverlay] = useState(undefined);
 const [productsMenuOpen, setProductsMenuOpen] = useState(false);
 const [searchOpen, setSearchOpen] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);

 const isHome = pathname === "/";
 const isProductsPage =
  pathname === "/urunler" || pathname.startsWith("/urunler/");
 const headerHidden =
  isHome && scrolled && !searchOpen && !menuOpen && !productsMenuOpen;

 const toggleSearch = () => {
  setSearchOpen((prev) => {
   const next = !prev;
   if (next) setProductsMenuOpen(false);
   return next;
  });
 };

 useLayoutEffect(() => {
  if (!isHome) {
   setScrolled(false);
   return;
  }

  setScrolled(false);

  const resetScroll = () => {
   window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  resetScroll();
  requestAnimationFrame(resetScroll);
 }, [isHome, pathname]);

 useEffect(() => {
  if (!isHome) return;

  const onScroll = () => {
   const next = window.scrollY > getHeaderHideThreshold();
   setScrolled(next);
   if (next) {
    setMenuOpen(false);
   }
  };

  const onPageShow = (event) => {
   if (!event.persisted) return;
   window.scrollTo({ top: 0, left: 0, behavior: "instant" });
   setScrolled(false);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pageshow", onPageShow);

  return () => {
   window.removeEventListener("scroll", onScroll);
   window.removeEventListener("pageshow", onPageShow);
  };
 }, [isHome, pathname]);

 useLayoutEffect(() => {
  if (isProductsPage) {
   setHeroOverlay(false);
   return;
  }

  const updateHeroOverlay = () => {
   const hero = document.querySelector(HERO_SELECTORS);
   if (!hero) {
    setHeroOverlay(false);
    return;
   }
   setHeroOverlay(isLogoOverHero());
  };

  updateHeroOverlay();

  window.addEventListener("scroll", updateHeroOverlay, { passive: true });
  window.addEventListener("resize", updateHeroOverlay);

  const hero = document.querySelector(HERO_SELECTORS);
  const heroObserver = hero ? new ResizeObserver(updateHeroOverlay) : null;
  heroObserver?.observe(hero);

  const header = document.querySelector(".site-header");
  const headerObserver = header ? new ResizeObserver(updateHeroOverlay) : null;
  headerObserver?.observe(header);

  return () => {
   window.removeEventListener("scroll", updateHeroOverlay);
   window.removeEventListener("resize", updateHeroOverlay);
   heroObserver?.disconnect();
   headerObserver?.disconnect();
  };
 }, [pathname, isProductsPage]);

 useEffect(() => {
  setProductsMenuOpen(false);
  setSearchOpen(false);
  setMenuOpen(false);
 }, [pathname]);

 useEffect(() => {
  document.documentElement.style.setProperty(
   "--search-bar-height",
   searchOpen ? "4.75rem" : "0rem"
  );

  if (searchOpen) {
   document.documentElement.dataset.searchOpen = "true";
  } else {
   delete document.documentElement.dataset.searchOpen;
  }

  return () => {
   document.documentElement.style.setProperty("--search-bar-height", "0rem");
   delete document.documentElement.dataset.searchOpen;
  };
 }, [searchOpen]);

 useEffect(() => {
  if (!searchOpen && !productsMenuOpen) return;

  const onKeyDown = (event) => {
   if (event.key !== "Escape") return;
   if (searchOpen) setSearchOpen(false);
   if (productsMenuOpen) setProductsMenuOpen(false);
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
 }, [searchOpen, productsMenuOpen]);

 return (
  <header
   data-home={isHome ? "true" : "false"}
   data-hero-overlay={heroOverlay ? "true" : "false"}
   data-search-open={searchOpen ? "true" : "false"}
   data-menu-open={productsMenuOpen || menuOpen || searchOpen ? "true" : "false"}
   data-hidden={headerHidden ? "true" : "false"}
   className={cn(
    "site-header group/header pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent transition-[transform,opacity] duration-300 ease-out [&_.header-search-shell]:pointer-events-auto [&_.products-mega-menu-root[data-open=true]_.products-mega-menu-panel]:pointer-events-auto **:[[role=search]]:pointer-events-auto [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_form]:pointer-events-auto [&_input]:pointer-events-auto",
    headerHidden && "pointer-events-none -translate-y-full opacity-0"
   )}
  >
   <Navbar
    searchOpen={searchOpen}
    productsMenuOpen={productsMenuOpen}
    menuOpen={menuOpen}
    onMenuOpenChange={setMenuOpen}
    onProductsMenuOpenChange={setProductsMenuOpen}
    onSearchToggle={toggleSearch}
    onSearchClose={() => setSearchOpen(false)}
   />
   <HeaderSearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
  </header>
 );
}
