"use client";

import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";

export function Navbar({
  compact,
  searchOpen,
  productsMenuOpen,
  onProductsMenuOpenChange,
  onSearchToggle,
  onSearchClose,
}) {
  return (
    <>
      <MobileNavbar
        searchOpen={searchOpen}
        onSearchToggle={onSearchToggle}
      />
      <DesktopNavbar
        compact={compact}
        searchOpen={searchOpen}
        productsMenuOpen={productsMenuOpen}
        onSearchToggle={onSearchToggle}
        onSearchClose={onSearchClose}
        onProductsMenuOpenChange={onProductsMenuOpenChange}
      />
    </>
  );
}
