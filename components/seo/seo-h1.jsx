import { brandName } from "@/lib/brand";
import { cn } from "@/lib/utils";

const brandSuffix = ` - ${brandName}`;

function splitSeoTitle(pageTitle) {
 const trimmed = pageTitle.trim();

 if (trimmed.endsWith(brandSuffix)) {
  return {
   primary: trimmed.slice(0, -brandSuffix.length),
   suffix: brandSuffix,
  };
 }

 return { primary: trimmed, suffix: null };
}

export function SeoH1({ title, className, children, ...props }) {
 const pageTitle = title?.trim() ?? "";
 const { primary, suffix } = splitSeoTitle(pageTitle);

 return (
  <h1 className={cn(className)} {...props}>
   {children ?? primary}
   {suffix}
  </h1>
 );
}
