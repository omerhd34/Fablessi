import { brandFullName } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const brandSuffix = ` | ${brandFullName}`;

export function SeoH1({ title, className, children, ...props }) {
 const pageTitle = title?.trim() ?? "";
 const showBrandSuffix = pageTitle && !pageTitle.endsWith(brandSuffix);

 return (
  <h1 className={cn(className)} {...props}>
   {children ?? pageTitle}
   {showBrandSuffix ? <span className="sr-only">{brandSuffix}</span> : null}
  </h1>
 );
}
