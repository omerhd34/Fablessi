import Image from "next/image";
import Link from "next/link";
import { getPrimaryImageUrl } from "@/lib/queries/home";
import { getProductCardLabel } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductCard({
 product,
 className,
 priority = false,
 variant = "default",
}) {
 const imageUrl = getPrimaryImageUrl(product);
 const isCatalog = variant === "catalog";

 return (
  <article className={cn("group/card", className)}>
   <Link href={`/urunler/${product.slug}`} className="block cursor-pointer">
    <div
     className={cn(
      "product-card-kalif relative overflow-hidden transition-[border-color,box-shadow] duration-200",
      isCatalog
       ? "aspect-5/4 rounded-3xl border border-charcoal/12 shadow-[0_2px_12px_rgb(0_0_0/5%)] group-hover/card:border-charcoal/20 group-hover/card:shadow-[0_8px_28px_rgb(0_0_0/8%)]"
       : "aspect-4/5"
     )}
    >
     {imageUrl ? (
      <Image
       src={imageUrl}
       alt={product.images?.[0]?.alt ?? product.name}
       fill
       sizes={
        isCatalog
         ? "(max-width: 640px) 100vw, 50vw"
         : "(max-width: 768px) 50vw, 25vw"
       }
       className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
       priority={priority}
      />
     ) : (
      <div className="absolute inset-0 bg-cream/70" aria-hidden />
     )}

     <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

     {product.collection?.name ? (
      <span
       className={cn(
        "absolute top-3 right-3 z-10 inline-flex rounded-2xl bg-white/92 px-3 py-1.5 font-semibold text-charcoal shadow-sm backdrop-blur-sm",
        isCatalog ? "text-sm" : "text-xs"
       )}
      >
       {product.collection.name}
      </span>
     ) : null}

     <div className="absolute right-3 bottom-3 left-3">
      <span
       className={cn(
        "inline-flex max-w-[85%] rounded-full bg-white/95 font-semibold text-charcoal shadow-sm backdrop-blur-sm",
        isCatalog ? "px-4 py-2 text-sm" : "px-3.5 py-1.5 text-xs"
       )}
      >
       {getProductCardLabel(product)}
      </span>
     </div>
    </div>
   </Link>
  </article>
 );
}
