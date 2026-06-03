"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search, SupportAgent } from "@/lib/icons";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import {
 headerUtilityLeft,
 headerUtilityRight,
 primaryNavItems,
 secondaryNavItems,
} from "@/lib/navigation";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import { cn } from "@/lib/utils";
import { NavSeparatorRow } from "@/components/layout/nav-separator-row";
import { ProductsMegaMenu } from "@/components/layout/products-mega-menu";

const utilityIcons = {
 search: Search,
 map: MapPin,
 support: SupportAgent,
};

function leaveHoverZone(event, onLeave) {
 const related = event.relatedTarget;
 if (related instanceof Node && event.currentTarget.contains(related)) {
  return;
 }
 onLeave();
}

export function DesktopNavbar({
 compact = false,
 productsMenuOpen = false,
 onProductsMenuOpenChange,
 onSearchToggle,
 onSearchClose,
 searchOpen,
}) {
 const pathname = usePathname();

 const setProductsOpenState = (open) => {
  onProductsMenuOpenChange?.(open);
  if (open) {
   onSearchClose?.();
  }
 };

 const isDesktopNav = useIsDesktopNav();

 const productsActive =
  pathname === "/urunler" ||
  pathname.startsWith("/urunler/") ||
  productsMenuOpen;

 if (!isDesktopNav) {
  return null;
 }

 return (
  <div
   className="nav-desktop relative bg-transparent"
   aria-label="Masaüstü menü"
  >
   <div
    className={cn(
     "border-b border-white/10",
     compact && "border-transparent"
    )}
    onMouseEnter={() => setProductsOpenState(false)}
   >
    <div className="mx-auto grid h-14 max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center px-8 xl:px-12">
     <div className="flex items-center gap-5">
      {headerUtilityLeft.map((item) => (
       <UtilityNavAction
        key={item.href}
        item={item}
        searchOpen={searchOpen}
        onSearchToggle={onSearchToggle}
       />
      ))}
     </div>

     <BrandLogoLink size="md" className="justify-self-center" />

     <div className="flex items-center justify-end gap-5">
      {headerUtilityRight.map((item) => {
       const Icon = utilityIcons[item.icon];
       if (!Icon) return null;

       return (
        <Link
         key={item.href}
         href={item.href}
         className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
         aria-label={item.label}
        >
         <Icon className="size-4 shrink-0 xl:size-5" />
         {item.icon === "support" ? (
          <span className="text-[0.65rem] tracking-wide">Destek</span>
         ) : null}
        </Link>
       );
      })}
     </div>
    </div>
   </div>

   <div className="header-nav-expanded">
    <div
     className="border-b border-white/10 py-2.5"
     onMouseEnter={() => setProductsOpenState(false)}
    >
     <NavSeparatorRow
      items={secondaryNavItems}
      variant="secondary"
      pathname={pathname}
     />
    </div>

    <div
     className="relative"
     onMouseLeave={(event) =>
      leaveHoverZone(event, () => setProductsOpenState(false))
     }
    >
     <div className="border-b border-white/10 py-3.5">
      <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 xl:gap-x-9">
       {primaryNavItems.map((item) =>
        item.megaMenu === "products" ? (
         <ProductsNavTrigger
          key={item.href}
          item={item}
          active={productsActive}
          onOpen={() => setProductsOpenState(true)}
         />
        ) : (
         <PrimaryNavLink
          key={item.href}
          item={item}
          pathname={pathname}
          onHover={() => setProductsOpenState(false)}
         />
        )
       )}
      </nav>
     </div>

     <ProductsMegaMenu open={productsMenuOpen} />
    </div>
   </div>
  </div>
 );
}

function ProductsNavTrigger({ item, active, onOpen }) {
 return (
  <Link
   href={item.href}
   onMouseEnter={onOpen}
   onFocus={onOpen}
   data-active={active ? "true" : undefined}
   className={cn(
    "nav-menu-link font-display text-[13px] font-normal tracking-[0.18em] uppercase transition-colors",
    active ? "text-white" : "text-white/85 hover:text-white"
   )}
  >
   {item.label}
  </Link>
 );
}

function PrimaryNavLink({ item, pathname, onHover }) {
 const isActive =
  pathname === item.href || pathname.startsWith(`${item.href}/`);

 return (
  <Link
   href={item.href}
   onMouseEnter={onHover}
   onFocus={onHover}
   data-active={isActive ? "true" : undefined}
   className={cn(
    "nav-menu-link font-display text-[13px] font-normal tracking-[0.18em] uppercase transition-colors",
    isActive ? "text-white" : "text-white/85 hover:text-white"
   )}
  >
   {item.label}
  </Link>
 );
}

function UtilityNavAction({ item, searchOpen, onSearchToggle }) {
 const Icon = utilityIcons[item.icon];
 if (!Icon) return null;

 if (item.icon === "search") {
  return (
   <button
    type="button"
    onClick={onSearchToggle}
    className={cn(
     "cursor-pointer text-white/80 transition-colors hover:text-white",
     searchOpen && "text-white"
    )}
    aria-label={item.label}
    aria-expanded={searchOpen}
   >
    <Icon className="size-4 shrink-0 xl:size-5" />
   </button>
  );
 }

 return (
  <Link
   href={item.href}
   className="text-white/80 transition-colors hover:text-white"
   aria-label={item.label}
  >
   <Icon className="size-4 shrink-0 xl:size-5" />
  </Link>
 );
}
