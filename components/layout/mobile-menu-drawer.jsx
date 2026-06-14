"use client";

import Link from "next/link";
import { useState } from "react";
import {
 ChevronLeft,
 CloseIcon,
 HeroChevronRight,
 Collections,
 Explore,
 Heart,
 HeartFilled,
 HelpOutline,
 Home,
 MapPin,
 MissionVision,
 SupportAgent,
 ViewModule,
 Work,
} from "@/lib/icons";
import { useFavorites } from "@/contexts/favorites-provider";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileProductsCategoryGrid } from "@/components/layout/mobile-products-category-grid";
import {
 mobileNavSheetClosedClass,
 mobileNavSheetOpenClass,
 mobileNavSheetOverlayClass,
} from "@/lib/layout/header-styles";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/contexts/locale-provider";
import { brandName } from "@/lib/navigation";
import {
 SheetClose,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";

const mobileNavIconMap = {
 home: Home,
 products: ViewModule,
 explore: Explore,
 favorites: Heart,
 collections: Collections,
 projects: Work,
 stores: MapPin,
 mission: MissionVision,
 faq: HelpOutline,
 contact: SupportAgent,
};

const mobileNavSheetClass =
 "mobile-nav-sheet top-3.5! bottom-3.5! left-3.5! h-auto! w-[min(21.5rem,calc(100vw-1.75rem))]! max-w-[21.5rem]! gap-0! rounded-4xl border border-[var(--glass-hero-border)]! bg-[var(--glass-hero-surface)]! text-white/94 shadow-[var(--glass-hero-shadow)]! transition-none! sm:top-5! sm:bottom-5! sm:left-5! sm:w-[min(25.5rem,calc(100vw-2.5rem))]! sm:max-w-[25.5rem] sm:rounded-[2.25rem] [backdrop-filter:var(--glass-hero-blur)] [-webkit-backdrop-filter:var(--glass-hero-blur)]";

const mobileNavScrollClass =
 "mobile-nav-sheet__scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 [scrollbar-color:oklch(1_0_0/42%)_transparent] [scrollbar-width:thin] hover:[&::-webkit-scrollbar-thumb]:bg-white/55 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/38 [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1 [@media(hover:hover)_and_(pointer:fine)]:pr-3";

const mobileNavLinkClass =
 "flex min-h-14 cursor-pointer items-center gap-3 px-0 py-4 text-[0.9375rem] font-medium text-white/92 transition-colors duration-200 hover:text-white";

const mobileNavIconClass =
 "size-5 shrink-0 text-white/68 transition-colors duration-200 group-hover:text-white/88";

export function MobileMenuDrawer({ pathname, onClose }) {
 const [productsViewOpen, setProductsViewOpen] = useState(false);
 const { navigation, t } = useTranslations();
 const mobileNavSection = navigation.mobileNavSections[0];
 const mobileNavItems = mobileNavSection?.items ?? [];

 return (
  <SheetContent
   side="left"
   showCloseButton={false}
   overlayClassName={mobileNavSheetOverlayClass}
   className={cn(
    mobileNavSheetClass,
    mobileNavSheetOpenClass,
    mobileNavSheetClosedClass,
    "mobile-nav-sheet flex flex-col bg-transparent! p-0 data-open:animate-none data-closed:animate-none"
   )}
  >
   <SheetHeader className="sr-only">
    <SheetTitle>
     {productsViewOpen
      ? t("nav.productCategories")
      : t("nav.mainMenuTitle", { brand: brandName })}
    </SheetTitle>
   </SheetHeader>

   <div className="flex shrink-0 justify-end px-5 pt-5 pb-2">
    <SheetClose asChild>
     <button
      type="button"
      className="-mr-1.5 flex size-10 cursor-pointer items-center justify-center rounded-full text-white/82 transition-[color,background-color] duration-200 hover:bg-white/12 hover:text-white focus-visible:shadow-[0_0_0_2px_oklch(1_0_0/28%)] focus-visible:outline-none"
      aria-label={t("nav.closeMenu")}
     >
      <CloseIcon className="size-5 shrink-0" strokeWidth={3.25} aria-hidden />
     </button>
    </SheetClose>
   </div>

   {productsViewOpen ? (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-6">
     <button
      type="button"
      onClick={() => setProductsViewOpen(false)}
      className="group mx-5 mb-4 flex cursor-pointer items-center gap-2 border-b border-white/18 pb-4 text-left text-[1.0625rem] font-semibold text-white/94 transition-colors duration-200 hover:text-white"
     >
      <ChevronLeft className={mobileNavIconClass} aria-hidden />
      <ViewModule className={mobileNavIconClass} aria-hidden />
      {t("nav.products")}
     </button>

     <div className={mobileNavScrollClass}>
      <div className="px-0">
       <MobileProductsCategoryGrid onClose={onClose} />
      </div>
     </div>
    </div>
   ) : (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
     <nav
      className={cn(mobileNavScrollClass, "flex min-h-0 flex-1 flex-col")}
      aria-label={t("nav.mainNav")}
     >
      <ul className="flex flex-col px-0">
       {mobileNavItems.map((item) =>
        item.href === "/favoriler" ? (
         <MobileDrawerFavoritesItem
          key={item.href}
          pathname={pathname}
          onClose={onClose}
          t={t}
         />
        ) : (
         <MobileDrawerNavItem
          key={item.href}
          item={item}
          pathname={pathname}
          onClose={onClose}
          onOpenProductsMenu={() => setProductsViewOpen(true)}
          t={t}
         />
        )
       )}
      </ul>
     </nav>

     <div className="mobile-nav-sheet__footer shrink-0 border-t border-white/18 px-5 py-4">
      <LocaleSwitcher variant="mobile" />
     </div>
    </div>
   )}
  </SheetContent>
 );
}

function MobileDrawerFavoritesItem({ pathname, onClose, t }) {
 const { count, hydrated } = useFavorites();
 const active =
  pathname === "/favoriler" || pathname.startsWith("/favoriler/");
 const visibleCount = hydrated ? count : 0;

 return (
  <li className="mobile-nav-item border-b border-white/18 last:border-b-0">
   <Link
    href="/favoriler"
    onClick={onClose}
    className={cn(
     mobileNavLinkClass,
     "group",
     active && "font-semibold text-white"
    )}
    aria-label={t("favorites.navLabel", { count: visibleCount })}
    aria-current={active ? "page" : undefined}
   >
    {visibleCount > 0 ? (
     <HeartFilled className={mobileNavIconClass} aria-hidden />
    ) : (
     <Heart className={mobileNavIconClass} aria-hidden />
    )}
    <span className="flex-1">{t("nav.favorites")}</span>
   </Link>
  </li>
 );
}

function MobileDrawerNavItem({
 item,
 pathname,
 onClose,
 onOpenProductsMenu,
 t,
}) {
 const active =
  item.href === "/"
   ? pathname === "/"
   : pathname === item.href || pathname.startsWith(`${item.href}/`);
 const isProductsMenu = item.megaMenu === "products";
 const Icon = item.icon ? mobileNavIconMap[item.icon] : null;

 if (isProductsMenu) {
  return (
   <li className="mobile-nav-item border-b border-white/18 last:border-b-0">
    <button
     type="button"
     onClick={onOpenProductsMenu}
     className={cn(
      mobileNavLinkClass,
      "group w-full text-left",
      active && "font-semibold text-white"
     )}
     aria-label={t("nav.openProductCategories")}
    >
     {Icon ? <Icon className={mobileNavIconClass} aria-hidden /> : null}
     <span className="flex-1">{item.label}</span>
     <HeroChevronRight
      className="size-4 shrink-0 text-white/72 transition-colors duration-200 group-hover:text-white/92"
      strokeWidth={3.5}
      aria-hidden
     />
    </button>
   </li>
  );
 }

 return (
  <li className="mobile-nav-item border-b border-white/18 last:border-b-0">
   <Link
    href={item.href}
    onClick={onClose}
    className={cn(
     mobileNavLinkClass,
     "group",
     active && "font-semibold text-white"
    )}
   >
    {Icon ? <Icon className={mobileNavIconClass} aria-hidden /> : null}
    {item.label}
   </Link>
  </li>
 );
}
