"use client";

import { showFavoriteToast } from "@/components/favorites/favorite-toast";
import { useFavorites } from "@/contexts/favorites-provider";
import { useLocale } from "@/contexts/locale-provider";
import { Heart, HeartFilled } from "@/lib/icons";
import { getProductFavoriteToastLabel } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductFavoriteButton({ product, className }) {
 const { t, dictionary } = useLocale();
 const { isFavorite, toggleFavorite, hydrated } = useFavorites();
 const favorited = hydrated && isFavorite(product.slug);

 const handleClick = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const added = toggleFavorite(product);

  showFavoriteToast({
   added,
   title: added ? t("favorites.addedToast") : t("favorites.removedToast"),
   description: getProductFavoriteToastLabel(product, dictionary),
   closeLabel: t("common.close"),
  });
 };

 return (
  <button
   type="button"
   onClick={handleClick}
   aria-label={
    favorited ? t("product.removeFromFavorites") : t("product.addToFavorites")
   }
   aria-pressed={favorited}
   className={cn(
    "inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/92 text-charcoal shadow-sm backdrop-blur-sm transition hover:bg-white",
    favorited && "text-red-500",
    className
   )}
  >
   {favorited ? (
    <HeartFilled className="size-5" aria-hidden />
   ) : (
    <Heart className="size-5" aria-hidden />
   )}
  </button>
 );
}
