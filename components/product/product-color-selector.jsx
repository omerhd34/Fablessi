"use client";

import { useLocale } from "@/contexts/locale-provider";
import { getColorVariantLabel, getColorVariantSwatch } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const productColorPanelClass =
 "rounded-3xl border border-charcoal/12 bg-white px-4 py-3.5 shadow-[0_1px_3px_rgb(0_0_0/4%)]";

function ColorSwatchOption({
 label,
 swatchColor,
 isSelected,
 onClick,
 interactive,
}) {
 const content = (
  <>
   <span
    className={cn(
     "relative block size-7 origin-center scale-100 rounded-full border border-charcoal/10 shadow-[inset_0_1px_2px_rgb(0_0_0/10%)] transition-[scale,box-shadow] duration-750 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150",
     isSelected &&
     "shadow-[0_0_0_2px_white,0_0_0_3.5px_var(--color-charcoal)]",
     interactive && "group-hover:scale-125"
    )}
    style={{ backgroundColor: swatchColor }}
    aria-hidden
   />
   <span
    className={cn(
     "text-center text-[0.625rem] leading-snug tracking-wide transition-colors duration-200",
     isSelected ? "font-semibold text-charcoal" : "font-medium text-charcoal/45"
    )}
   >
    {label}
   </span>
  </>
 );

 const wrapperClassName = cn(
  "group flex min-w-0 flex-col items-center gap-1.5",
  interactive && "cursor-pointer"
 );

 if (!interactive) {
  return (
   <span className={wrapperClassName} aria-current="true">
    {content}
   </span>
  );
 }

 return (
  <button
   type="button"
   role="radio"
   aria-checked={isSelected}
   aria-label={label}
   onClick={onClick}
   className={cn(wrapperClassName, "rounded-lg p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-charcoal/30")}
  >
   {content}
  </button>
 );
}

export function ProductColorSelector({
 variants,
 selectedPrefix,
 onSelect,
 className,
}) {
 const { t, dictionary } = useLocale();

 if (!variants?.length) return null;

 const isSingleVariant = variants.length === 1;

 return (
  <div className={cn(productColorPanelClass, className)}>
   <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-charcoal/40 uppercase">
    {t("product.color")}
   </span>

   <div
    className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
    role={isSingleVariant ? undefined : "radiogroup"}
    aria-label={t("product.color")}
   >
    {variants.map((variant) => {
     const isSelected = isSingleVariant || variant.prefix === selectedPrefix;
     const label = getColorVariantLabel(variant.prefix, dictionary, t);
     const swatchColor = getColorVariantSwatch(variant.prefix);

     return (
      <ColorSwatchOption
       key={variant.prefix}
       label={label}
       swatchColor={swatchColor}
       isSelected={isSelected}
       interactive={!isSingleVariant}
       onClick={() => onSelect(variant.prefix)}
      />
     );
    })}
   </div>
  </div>
 );
}
