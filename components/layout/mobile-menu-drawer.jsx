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
 MailOutline,
 MissionVision,
 ViewModule,
 Work,
} from "@/lib/icons";
import { useFavorites } from "@/contexts/favorites-provider";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileProductsCategoryGrid } from "@/components/layout/mobile-products-category-grid";
import {
 mobileNavIconClass,
 mobileNavIconWrapClass,
 mobileNavItemClass,
 mobileNavLinkClass,
 mobileNavLinkLabelClass,
 mobileNavLinkTrailingClass,
 mobileNavProductsBackClass,
 mobileNavProductsBackBtnClass,
 mobileNavSheetCloseBtnClass,
 mobileNavSheetClosedClass,
 mobileNavSheetFooterClass,
 mobileNavSheetHeaderClass,
 mobileNavSheetLogoClass,
 mobileNavSheetOpenClass,
 mobileNavSheetOverlayClass,
 mobileNavSheetPanelClass,
 mobileNavSheetScrollClass,
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
 contact: MailOutline,
};

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
    mobileNavSheetPanelClass,
    mobileNavSheetOpenClass,
    mobileNavSheetClosedClass,
    "mobile-nav-sheet flex flex-col overflow-hidden border-0! p-0 data-open:animate-none data-closed:animate-none sm:max-w-none!"
   )}
  >
   <SheetHeader className="sr-only">
    <SheetTitle>
     {productsViewOpen
      ? t("nav.productCategories")
      : t("nav.mainMenuTitle", { brand: brandName })}
    </SheetTitle>
   </SheetHeader>

   <div className={mobileNavSheetHeaderClass}>
    <div className={mobileNavSheetLogoClass}>
     <BrandLogoLink size="lg" />
    </div>
    <SheetClose asChild>
     <button
      type="button"
      className={mobileNavSheetCloseBtnClass}
      aria-label={t("nav.closeMenu")}
     >
      <CloseIcon className="size-5 shrink-0" strokeWidth={3.25} aria-hidden />
     </button>
    </SheetClose>
   </div>

   {productsViewOpen ? (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-6 lg:pb-8">
     <div className={cn(mobileNavProductsBackClass, "w-full shrink-0")}>
      <button
       type="button"
       onClick={() => setProductsViewOpen(false)}
       className={mobileNavProductsBackBtnClass}
       aria-label={t("nav.mainMenu")}
      >
       <span className={cn(mobileNavIconWrapClass, "lg:bg-white/12")}>
        <ChevronLeft className={mobileNavIconClass} aria-hidden />
       </span>
       <ViewModule className={cn(mobileNavIconClass, "lg:hidden")} aria-hidden />
       <span>{t("nav.products")}</span>
      </button>
      <span className="min-w-0 flex-1" aria-hidden />
      <span className={cn(mobileNavLinkTrailingClass, "hidden lg:block")} aria-hidden />
     </div>

     <div className={mobileNavSheetScrollClass}>
      <MobileProductsCategoryGrid onClose={onClose} variant="drawer" />
     </div>
    </div>
   ) : (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
     <nav
      className={cn(
       mobileNavSheetScrollClass,
       "flex min-h-0 flex-1 flex-col lg:pt-1"
      )}
      aria-label={t("nav.mainNav")}
     >
      <ul className="flex flex-col px-0 lg:gap-1">
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

     <div className={mobileNavSheetFooterClass}>
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
  <li className={mobileNavItemClass}>
   <Link
    href="/favoriler"
    onClick={onClose}
    className={cn(
     mobileNavLinkClass,
     "group",
     active && "font-semibold text-white lg:bg-white/16"
    )}
    aria-label={t("favorites.navLabel", { count: visibleCount })}
    aria-current={active ? "page" : undefined}
   >
    <span className={mobileNavIconWrapClass}>
     {visibleCount > 0 ? (
      <HeartFilled className={mobileNavIconClass} aria-hidden />
     ) : (
      <Heart className={mobileNavIconClass} aria-hidden />
     )}
    </span>
    <span className={mobileNavLinkLabelClass}>{t("nav.favorites")}</span>
    <span className={mobileNavLinkTrailingClass} aria-hidden />
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
   <li className={mobileNavItemClass}>
    <button
     type="button"
     onClick={onOpenProductsMenu}
     className={cn(
      mobileNavLinkClass,
      "group",
      active && "font-semibold text-white lg:bg-white/16"
     )}
     aria-label={t("nav.openProductCategories")}
    >
     {Icon ? (
      <span className={mobileNavIconWrapClass}>
       <Icon className={mobileNavIconClass} aria-hidden />
      </span>
     ) : null}
     <span className={mobileNavLinkLabelClass}>{item.label}</span>
     <HeroChevronRight
      className={cn(
       mobileNavLinkTrailingClass,
       "text-white/72 transition-colors duration-200 group-hover:text-white/92"
      )}
      strokeWidth={3.5}
      aria-hidden
     />
    </button>
   </li>
  );
 }

 return (
  <li className={mobileNavItemClass}>
   <Link
    href={item.href}
    onClick={onClose}
    className={cn(
     mobileNavLinkClass,
     "group",
     active && "font-semibold text-white lg:bg-white/16"
    )}
   >
    {Icon ? (
     <span className={mobileNavIconWrapClass}>
      <Icon className={mobileNavIconClass} aria-hidden />
     </span>
    ) : null}
    <span className={mobileNavLinkLabelClass}>{item.label}</span>
    <span className={mobileNavLinkTrailingClass} aria-hidden />
   </Link>
  </li>
 );
}
