"use client";

import Link from "next/link";
import { catalogColorOrder, catalogColorSwatches } from "@/lib/catalog-colors";
import { productsMegaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function ProductsCategoryFilter({
 categorySlug,
 variant = "list",
 onNavigate,
}) {
 const { groups } = productsMegaMenu;
 const isGrid = variant === "grid";

 return (
  <div
   className={cn(
    isGrid
     ? "grid grid-cols-2 gap-2"
     : "space-y-1"
   )}
  >
   <Link
    href="/urunler"
    onClick={onNavigate}
    className={cn(
     "cursor-pointer transition-colors",
     isGrid
      ? "rounded-2xl border px-3 py-2.5 text-center text-sm"
      : "block rounded-lg px-2.5 py-2 text-sm",
     !categorySlug
      ? "border-charcoal/15 bg-cream/70 font-semibold text-charcoal"
      : isGrid
        ? "border-charcoal/8 bg-white/80 text-charcoal/70 hover:border-charcoal/15 hover:text-charcoal"
        : "text-charcoal/65 hover:text-charcoal"
    )}
   >
    Tüm ürünler
   </Link>
   {groups.map((group) => (
    <Link
     key={group.slug}
     href={group.href}
     onClick={onNavigate}
     className={cn(
      "cursor-pointer transition-colors",
      isGrid
       ? "rounded-2xl border px-3 py-2.5 text-center text-sm"
       : "block rounded-lg px-2.5 py-2 text-sm",
      categorySlug === group.slug
       ? "border-charcoal/15 bg-cream/70 font-semibold text-charcoal"
       : isGrid
         ? "border-charcoal/8 bg-white/80 text-charcoal/70 hover:border-charcoal/15 hover:text-charcoal"
         : "text-charcoal/65 hover:text-charcoal"
     )}
    >
     {group.label}
    </Link>
   ))}
  </div>
 );
}

export function ProductsColorFilter({
 selectedColor,
 onColorChange,
 availableColors,
 variant = "grid",
}) {
 if (availableColors.length === 0) return null;

 const isCompact = variant === "compact";

 return (
  <div
   className={cn(
    isCompact ? "flex flex-wrap gap-2" : "grid grid-cols-4 gap-2.5"
   )}
  >
   {catalogColorOrder
    .filter((color) => availableColors.includes(color))
    .map((color) => {
     const active = selectedColor === color;

     return (
      <button
       key={color}
       type="button"
       title={color}
       onClick={() => onColorChange(active ? null : color)}
       className={cn(
        "cursor-pointer transition-transform hover:scale-105",
        isCompact
         ? "inline-flex items-center gap-2 rounded-full border py-1.5 pr-3 pl-1.5"
         : "mx-auto flex size-9 items-center justify-center rounded-full border-2",
        isCompact
         ? active
           ? "border-charcoal bg-cream/70"
           : "border-charcoal/10 bg-white/80"
         : active
           ? "border-charcoal"
           : "border-transparent"
       )}
       aria-label={color}
       aria-pressed={active}
      >
       <span
        className={cn(
         "block shrink-0 rounded-full border border-charcoal/10",
         isCompact ? "size-6" : "size-7"
        )}
        style={{ backgroundColor: catalogColorSwatches[color] ?? "#ccc" }}
       />
       {isCompact ? (
        <span className="text-xs font-medium text-charcoal">{color}</span>
       ) : null}
      </button>
     );
    })}
  </div>
 );
}
