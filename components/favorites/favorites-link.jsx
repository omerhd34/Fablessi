"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/contexts/favorites-provider";
import { useTranslations } from "@/contexts/locale-provider";
import { Heart, HeartFilled } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
 headerIconBtnClass,
 heroNavActiveIconBtnClass,
 heroNavLinkOverlayClass,
 plainIconActiveClass,
} from "@/lib/layout/header-styles";

export function FavoritesLink({ className, iconClassName }) {
 const pathname = usePathname();
 const { count, hydrated } = useFavorites();
 const { t } = useTranslations();
 const active = pathname === "/favoriler" || pathname.startsWith("/favoriler/");
 const visibleCount = hydrated ? count : 0;

 return (
  <Link
   href="/favoriler"
   className={cn(
    headerIconBtnClass,
    heroNavLinkOverlayClass,
    "inline-flex cursor-pointer items-center justify-center rounded-full",
    !iconClassName && "size-10 lg:size-11 xl:size-12",
    active && cn(plainIconActiveClass, heroNavActiveIconBtnClass),
    className
   )}
   aria-label={t("favorites.navLabel", { count: visibleCount })}
   aria-current={active ? "page" : undefined}
  >
   {visibleCount > 0 ? (
    <HeartFilled
     className={cn(iconClassName ?? "size-[1.45rem]")}
     aria-hidden
    />
   ) : (
    <Heart className={cn(iconClassName ?? "size-[1.45rem]")} aria-hidden />
   )}
  </Link>
 );
}
