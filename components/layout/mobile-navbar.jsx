"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { MobileMenuDrawer } from "@/components/layout/mobile-menu-drawer";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export function MobileNavbar({ searchOpen, onSearchToggle }) {
 const pathname = usePathname();
 const [open, setOpen] = useState(false);
 const isDesktopNav = useIsDesktopNav();

 if (isDesktopNav) {
  return null;
 }

 return (
  <>
   <div
    className="nav-compact grid h-12 w-full grid-cols-3 items-center border-b border-white/10 px-3 sm:h-14 sm:px-5 md:px-8"
    aria-label="Mobil menü"
   >
    <div className="flex items-center gap-1 justify-self-start">
     <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
       <Button
        variant="ghost"
        size="icon"
        className="size-8 text-white hover:bg-white/10 hover:text-white sm:size-9"
        aria-label="Menüyü aç"
       >
        <Menu className="size-4 stroke-[1.25] sm:size-4.5" />
       </Button>
      </SheetTrigger>
      <MobileMenuDrawer
       pathname={pathname}
       onClose={() => setOpen(false)}
      />
     </Sheet>

     <button
      type="button"
      onClick={onSearchToggle}
      className={cn(
       "flex size-8 cursor-pointer items-center justify-center text-white transition-colors hover:text-white/90 sm:size-9",
       searchOpen && "text-white"
      )}
      aria-label="Ara"
      aria-expanded={searchOpen}
     >
      <Search className="size-4 stroke-[1.25] sm:size-4.5" />
     </button>
    </div>

    <BrandLogoLink size="sm" className="justify-self-center" />

    <div className="justify-self-end" aria-hidden />
   </div>
  </>
 );
}
