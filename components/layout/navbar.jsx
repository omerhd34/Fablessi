"use client";

import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";

export function Navbar({
  compact,
  searchOpen,
  onSearchToggle,
  onSearchClose,
  onProductsMenuOpenChange,
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
        onSearchToggle={onSearchToggle}
        onSearchClose={onSearchClose}
        onProductsMenuOpenChange={onProductsMenuOpenChange}
      />
    </>
  );
}
