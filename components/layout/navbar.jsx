"use client";

import { usePathname } from "next/navigation";
import { MobileMenuDrawer } from "@/components/layout/mobile-menu-drawer";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Sheet } from "@/components/ui/sheet";

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
    <MobileMenuDrawer pathname={pathname} onClose={closeMenu} />
   </Sheet>
  </>
 );
}
