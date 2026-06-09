"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/contexts/favorites-provider";
import { useTranslations } from "@/contexts/locale-provider";
import { Heart, HeartFilled } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function FavoritesLink({ className }) {
 const pathname = usePathname();
 const { count, hydrated } = useFavorites();
 const { t } = useTranslations();
 const active = pathname === "/favoriler" || pathname.startsWith("/favoriler/");
 const visibleCount = hydrated ? count : 0;

 return (
  <Link
   href="/favoriler"
   className={cn(
    "header-icon-btn relative inline-flex size-10 cursor-pointer items-center justify-center rounded-full lg:size-11 xl:size-12",
    active && "header-icon-btn--active",
    className
   )}
   aria-label={t("favorites.navLabel", { count: visibleCount })}
   aria-current={active ? "page" : undefined}
  >
   {visibleCount > 0 ? (
    <HeartFilled className="size-[1.45rem]" aria-hidden />
   ) : (
    <Heart className="size-[1.45rem]" aria-hidden />
   )}
   {visibleCount > 0 ? (
    <span
     className="absolute top-0 -right-1.5 text-[0.65rem] font-bold leading-none text-red-500"
     aria-hidden
    >
     +{visibleCount > 99 ? "99+" : visibleCount}
    </span>
   ) : null}
  </Link>
 );
}
