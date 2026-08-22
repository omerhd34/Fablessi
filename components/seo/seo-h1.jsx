import { brandName } from "@/lib/brand";
import { formatSeoTitle } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

const brandSuffix = ` - ${brandName}`;

function stripBrandSuffix(pageTitle) {
 const trimmed = pageTitle.trim();

 if (trimmed.endsWith(brandSuffix)) {
  return trimmed.slice(0, -brandSuffix.length);
 }

 return trimmed;
}

export function SeoH1({ title, className, children, ...props }) {
 const visible =
  typeof children === "string" ? children : stripBrandSuffix(title?.trim() ?? "");
 const seoTitle = formatSeoTitle(visible);

 return (
  <>
   <h1 className="sr-only">{seoTitle}</h1>
   <p className={cn(className)} aria-hidden="true" {...props}>
    {visible}
   </p>
  </>
 );
}
