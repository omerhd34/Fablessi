/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collections, MapPin, Search, SupportAgent, ViewModule, Work } from "@/lib/icons";
import { FavoritesLink } from "@/components/favorites/favorites-link";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ProductsMegaMenu } from "@/components/layout/products-mega-menu";
import { useTranslations } from "@/contexts/locale-provider";
import { useIsDesktopNav } from "@/hooks/use-is-desktop-nav";
import {
 headerIconBtnClass,
 headerPillClass,
 headerPillDividerClass,
 headerPillLinkClass,
 heroNavActiveIconBtnClass,
 heroNavActiveLinkOverlayClass,
 heroNavDividerOverlayClass,
 heroNavIconColorOverlayClass,
 heroNavLinkOverlayClass,
 heroNavPillOverlayClass,
 plainIconActiveClass,
} from "@/lib/layout/header-styles";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

const desktopNavIconMap = {
 products: ViewModule,
 collections: Collections,
 projects: Work,
 stores: MapPin,
 contact: SupportAgent,
};

const navDesktopLinkClass =
 "nav-desktop-link inline-flex items-center gap-[0.4375rem] px-3 py-2 text-sm font-medium whitespace-nowrap transition-[opacity,color] duration-200 xl:gap-2 xl:px-[1.125rem] xl:py-2.5 xl:text-base";

const navDesktopLinkIconClass =
 "nav-desktop-link__icon size-[1.0625rem] shrink-0 text-charcoal/60 xl:size-[1.125rem]";

function DesktopNavItem({
 item,
 pathname,
 productsMenuOpen,
 onProductsToggle,
 onProductsClose,
 productsButtonRef,
 showDivider,
}) {
 const isProducts = item.megaMenu === "products";
 const active = isProducts
  ? pathname === "/urunler" ||
  pathname.startsWith("/urunler/") ||
  productsMenuOpen
  : pathname === item.href || pathname.startsWith(`${item.href}/`);

 const Icon = item.icon ? desktopNavIconMap[item.icon] : null;
 const iconOnly = Boolean(item.iconOnly);
 const className = cn(
  iconOnly
   ? cn(
      headerIconBtnClass,
      heroNavLinkOverlayClass,
      "size-10 cursor-pointer rounded-full lg:size-11 xl:size-12"
     )
   : cn(navDesktopLinkClass, headerPillLinkClass, heroNavLinkOverlayClass),
  iconOnly
   ? active && cn(plainIconActiveClass, heroNavActiveIconBtnClass)
   : active &&
      cn(
       "nav-desktop-link--active font-semibold text-charcoal/90",
       heroNavActiveLinkOverlayClass
      )
 );
 const content = (
  <>
   {Icon ? (
    <Icon
     className={cn(
      iconOnly ? "size-[1.45rem]" : navDesktopLinkIconClass,
      heroNavIconColorOverlayClass,
      active && !iconOnly && "text-charcoal/75",
      active && !iconOnly && heroNavActiveLinkOverlayClass
     )}
     aria-hidden
    />
   ) : null}
   {iconOnly ? null : item.label}
  </>
 );

 return (
  <>
   {showDivider ? (
    <span
     className={cn(
      headerPillDividerClass,
      "nav-desktop-pill-divider mx-2",
      heroNavDividerOverlayClass
     )}
     aria-hidden
    />
   ) : null}
   {isProducts ? (
    <button
     ref={productsButtonRef}
     type="button"
     onClick={onProductsToggle}
     aria-expanded={productsMenuOpen}
     aria-haspopup="true"
     aria-label={iconOnly ? item.label : undefined}
     className={cn(className, "cursor-pointer")}
    >
     {content}
    </button>
   ) : (
    <Link
     href={item.href}
     onClick={onProductsClose}
     aria-label={iconOnly ? item.label : undefined}
     className={className}
    >
     {content}
    </Link>
   )}
  </>
 );
}

export function DesktopNavbar({
 productsMenuOpen = false,
 onProductsMenuOpenChange,
 onSearchToggle,
 onSearchClose,
 searchOpen,
}) {
 const pathname = usePathname();
 const isDesktopNav = useIsDesktopNav();
 const megaMenuPanelRef = useRef(null);
 const productsButtonRef = useRef(null);
 const { navigation, t } = useTranslations();
 const { primaryNavItems } = navigation;

 const setProductsOpenState = (open) => {
  onProductsMenuOpenChange?.(open);
  if (open) onSearchClose?.();
 };

 const toggleProductsMenu = () => {
  setProductsOpenState(!productsMenuOpen);
 };

 const closeProductsMenu = () => setProductsOpenState(false);

 useEffect(() => {
  if (!productsMenuOpen) return;

  const onPointerDown = (event) => {
   if (megaMenuPanelRef.current?.contains(event.target)) return;
   if (productsButtonRef.current?.contains(event.target)) return;
   setProductsOpenState(false);
  };

  document.addEventListener("pointerdown", onPointerDown);
  return () => document.removeEventListener("pointerdown", onPointerDown);
 }, [productsMenuOpen]);

 if (!isDesktopNav) return null;

 return (
  <div className="relative hidden lg:block" aria-label={t("nav.desktopMenu")}>
   <div className={cn(containerPremiumClass, "flex min-h-24 items-center justify-between gap-4 xl:gap-8")}>
    <div className="block h-fit w-fit flex-none self-center p-0 leading-none [&_.brand-logo-image]:h-12! xl:[&_.brand-logo-image]:!h-[3.25rem]">
     <BrandLogoLink size="xl" />
    </div>

    <nav
     className={cn(
      headerPillClass,
      heroNavPillOverlayClass,
      "nav-desktop-pill ml-auto inline-flex h-12 w-fit max-w-[min(100%,42rem)] shrink-0 items-center overflow-x-auto px-1.5 scrollbar-none xl:h-[3.35rem] xl:px-2 [&::-webkit-scrollbar]:hidden"
     )}
     aria-label={t("nav.mainNav")}
    >
     {primaryNavItems.map((item, index) => (
      <DesktopNavItem
       key={item.href}
       item={item}
       pathname={pathname}
       productsMenuOpen={productsMenuOpen}
       onProductsToggle={toggleProductsMenu}
       onProductsClose={closeProductsMenu}
       productsButtonRef={item.megaMenu === "products" ? productsButtonRef : undefined}
       showDivider={index > 0}
      />
     ))}

     <span
     className={cn(
      headerPillDividerClass,
      "nav-desktop-pill-divider mx-2",
      heroNavDividerOverlayClass
     )}
     aria-hidden
    />

     <button
      type="button"
      onClick={onSearchToggle}
      className={cn(
       headerIconBtnClass,
       heroNavLinkOverlayClass,
       "size-10 cursor-pointer rounded-full lg:size-11 xl:size-12",
       searchOpen && cn(plainIconActiveClass, heroNavActiveIconBtnClass)
      )}
      aria-label={t("common.search")}
      aria-expanded={searchOpen}
     >
      <Search className="size-[1.45rem]" />
     </button>

     <span
     className={cn(
      headerPillDividerClass,
      "nav-desktop-pill-divider mx-2",
      heroNavDividerOverlayClass
     )}
     aria-hidden
    />

     <FavoritesLink />

     <span
     className={cn(
      headerPillDividerClass,
      "nav-desktop-pill-divider mx-2",
      heroNavDividerOverlayClass
     )}
     aria-hidden
    />

     <LocaleSwitcher />
    </nav>
   </div>

   <ProductsMegaMenu open={productsMenuOpen} panelRef={megaMenuPanelRef} />
  </div>
 );
}
