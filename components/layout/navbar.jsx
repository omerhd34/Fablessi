"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Sheet } from "@/components/ui/sheet";

const MobileMenuDrawer = dynamic(() =>
 import("@/components/layout/mobile-menu-drawer").then(
  (module) => module.MobileMenuDrawer
 )
);

export function Navbar({
 searchOpen,
 menuOpen,
 onMenuOpenChange,
 onSearchToggle,
 onSearchClose,
 searchQuery,
 onSearchQueryChange,
 onSearchSubmit,
 onSearchClear,
}) {
 const pathname = usePathname();

 const openMenu = () => {
  onMenuOpenChange(true);
  onSearchClose?.();
 };

 const closeMenu = () => onMenuOpenChange(false);

 return (
  <>
   <MobileNavbar
    searchOpen={searchOpen}
    onSearchToggle={onSearchToggle}
    onMenuOpen={openMenu}
    searchQuery={searchQuery}
    onSearchQueryChange={onSearchQueryChange}
    onSearchSubmit={onSearchSubmit}
    onSearchClear={onSearchClear}
   />

   <Sheet open={menuOpen} onOpenChange={onMenuOpenChange}>
    {menuOpen ? (
     <MobileMenuDrawer pathname={pathname} onClose={closeMenu} />
    ) : null}
   </Sheet>
  </>
 );
}
