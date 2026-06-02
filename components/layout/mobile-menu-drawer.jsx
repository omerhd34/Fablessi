"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { SocialIcon } from "@/components/layout/social-icon";
import { cn } from "@/lib/utils";
import {
 brandName,
 getMobileSubmenuItems,
 primaryNavItems,
 secondaryNavItems,
} from "@/lib/navigation";
import { socialLinks } from "@/lib/site-contact";
import {
 SheetClose,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";

export function MobileMenuDrawer({ pathname, onClose }) {
 return (
  <SheetContent
   side="left"
   showCloseButton={false}
   className="mobile-nav-sheet flex h-full flex-col bg-white p-0 text-charcoal data-open:animate-none data-closed:animate-none"
  >
   <SheetHeader className="sr-only">
    <SheetTitle>Ana menü — {brandName}</SheetTitle>
   </SheetHeader>

   <div className="shrink-0 pl-3 pt-3 pb-1">
    <SheetClose asChild>
     <button
      type="button"
      className="flex size-9 items-center justify-center text-charcoal/80 transition-colors hover:text-charcoal"
      aria-label="Menüyü kapat"
     >
      <X className="size-5 stroke-[1.25]" />
     </button>
    </SheetClose>
   </div>

   <nav
    className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
    aria-label="Ana menü"
   >
    <ul className="flex flex-col px-6 pb-4">
     {primaryNavItems.map((item) => (
      <MobileDrawerNavItem
       key={item.href}
       item={item}
       pathname={pathname}
       onClose={onClose}
       variant="light"
      />
     ))}
    </ul>

    <div className="mt-auto bg-linear-to-b from-neutral-700 to-charcoal px-6 pb-5 pt-2">
     <ul className="flex flex-col" aria-label="Kurumsal menü">
      {secondaryNavItems.map((item) => (
       <MobileDrawerNavItem
        key={item.href}
        item={item}
        pathname={pathname}
        onClose={onClose}
        variant="dark"
       />
      ))}
     </ul>
    </div>
   </nav>

   <footer className="shrink-0 border-t border-charcoal/10 bg-white px-6 py-6">
    <div className="flex items-center justify-center gap-12">
     {socialLinks.map((item) => (
      <Link
       key={item.label}
       href={item.href}
       target="_blank"
       rel="noopener noreferrer"
       className="text-charcoal/45 transition-colors hover:text-charcoal"
       aria-label={item.label}
      >
       <SocialIcon label={item.label} />
      </Link>
     ))}
    </div>
   </footer>
  </SheetContent>
 );
}

function MobileDrawerNavItem({ item, pathname, onClose, variant }) {
 const [submenuOpen, setSubmenuOpen] = useState(false);
 const active =
  pathname === item.href || pathname.startsWith(`${item.href}/`);
 const isDark = variant === "dark";
 const submenuItems = getMobileSubmenuItems(item);
 const hasSubmenu = submenuItems.length > 0;

 return (
  <li
   className={cn(
    "border-b last:border-b-0",
    isDark ? "border-white/10" : "border-charcoal/8"
   )}
  >
   <div
    className={cn(
     "flex items-stretch",
     isDark
      ? active
       ? "text-white"
       : "text-white/85"
      : active
       ? "text-charcoal"
       : "text-charcoal/90"
    )}
   >
    <Link
     href={item.href}
     onClick={onClose}
     className={cn(
      "flex flex-1 items-center py-[1.35rem] transition-colors",
      isDark ? "hover:text-white" : "hover:text-charcoal"
     )}
    >
     <span className="font-display text-[13px] font-semibold leading-snug tracking-[0.22em] uppercase">
      {item.label}
     </span>
    </Link>
    {hasSubmenu ? (
     <button
      type="button"
      onClick={() => setSubmenuOpen((prev) => !prev)}
      className={cn(
       "flex w-12 shrink-0 items-center justify-center transition-colors",
       isDark ? "hover:text-white" : "hover:text-charcoal"
      )}
      aria-expanded={submenuOpen}
      aria-label={`${item.label} alt menüsünü ${submenuOpen ? "kapat" : "aç"}`}
     >
      <ChevronRight
       className={cn(
        "size-4 stroke-[1.25] transition-transform duration-200",
        submenuOpen && "rotate-90",
        isDark ? "text-white/30" : "text-charcoal/25"
       )}
       aria-hidden
      />
     </button>
    ) : null}
   </div>

   {hasSubmenu && submenuOpen ? (
    <ul
     className={cn(
      "flex flex-col pb-3 pl-4",
      isDark ? "text-white/80" : "text-charcoal/75"
     )}
    >
     {submenuItems.map((subItem) => (
      <MobileDrawerSubItem
       key={subItem.href}
       subItem={subItem}
       pathname={pathname}
       onClose={onClose}
       isDark={isDark}
      />
     ))}
    </ul>
   ) : null}
  </li>
 );
}

function MobileDrawerSubItem({ subItem, pathname, onClose, isDark }) {
 const basePath = subItem.href.split("?")[0];
 const subActive =
  pathname === subItem.href ||
  pathname.startsWith(`${basePath}/`) ||
  (subItem.href.includes("?") && pathname === basePath);

 return (
  <li>
   <Link
    href={subItem.href}
    onClick={onClose}
    className={cn(
     "block py-4 pr-2 transition-colors",
     subActive
      ? isDark
       ? "text-white"
       : "text-charcoal"
      : isDark
       ? "text-white/75 hover:text-white"
       : "text-charcoal/70 hover:text-charcoal"
    )}
   >
    <span className="font-display text-[12px] font-normal leading-snug tracking-[0.2em] uppercase">
     {subItem.label}
    </span>
   </Link>
  </li>
 );
}
