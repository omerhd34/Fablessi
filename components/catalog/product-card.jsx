"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductFavoriteButton } from "@/components/favorites/product-favorite-button";
import { useLocale } from "@/contexts/locale-provider";
import { IMAGE_QUALITY } from "@/lib/image-config";
import {
 formatProductPrice,
 getPrimaryImageUrl,
 getProductCardBottomLabel,
 getProductDisplayPrice,
} from "@/lib/product-utils";
import { productCardKalifClass } from "@/lib/layout/shared-styles";
import { catalogProductCardClass } from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductCard({
 product,
 className,
 priority = false,
 variant = "default",
 showFavoriteButton = false,
}) {
 const { locale } = useLocale();
 const imageUrl = getPrimaryImageUrl(product);
 const isCatalog = variant === "catalog";
 const isFeatured = variant === "featured";
 const bottomLabel = getProductCardBottomLabel(product, locale);
 const displayPrice = getProductDisplayPrice(product);
 const priceLabel = formatProductPrice(displayPrice, locale);
 const badgeClassName = cn(
  "inline-flex scale-100 rounded-full border border-white/20 bg-white/15 font-medium text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md transition-[scale] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.08] motion-reduce:duration-150",
  isCatalog ? "px-3 py-1.5 text-xs" : "px-2.5 py-1 text-[0.65rem]"
 );

 return (
  <article className={cn("group/card", className)}>
   <div
    className={cn(
     productCardKalifClass,
     "group/card relative",
     isCatalog
      ? cn("product-card-kalif--catalog aspect-5/4 rounded-3xl", catalogProductCardClass)
      : isFeatured
       ? "aspect-5/4 sm:aspect-3/2"
       : "aspect-4/5"
    )}
   >
    <Link
     href={`/urunler/${product.slug}`}
     className="absolute inset-0 block cursor-pointer"
    >
     {imageUrl ? (
      <Image
       src={imageUrl}
       alt={product.images?.[0]?.alt ?? product.name}
       fill
       sizes={
        isCatalog
         ? "(max-width: 640px) 100vw, 50vw"
         : isFeatured
          ? "(max-width: 640px) 100vw, 50vw"
          : "(max-width: 768px) 50vw, 25vw"
       }
       className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
       quality={IMAGE_QUALITY}
       priority={priority}
      />
     ) : (
      <div className="absolute inset-0 bg-cream/70" aria-hidden />
     )}

     <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/15" />

     {priceLabel ? (
      <span
       className={cn(
        badgeClassName,
        "absolute top-3 right-3 z-10 shrink-0 sm:top-auto sm:bottom-3"
       )}
      >
       {priceLabel}
      </span>
     ) : null}

     <span
      className={cn(
       badgeClassName,
       "absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] origin-left text-left leading-snug line-clamp-2"
      )}
     >
      {bottomLabel}
     </span>
    </Link>

    {showFavoriteButton ? (
     <ProductFavoriteButton
      product={product}
      className={cn(
       "absolute top-3 left-3 z-20",
       isFeatured &&
       "size-10 sm:size-9 [&_svg]:size-5.5 sm:[&_svg]:size-5"
      )}
     />
    ) : null}
   </div>
  </article>
 );
}
