import Link from "next/link";
import { brandSlug } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const sizeClasses = {
 xs: "brand-logo-lockup--xs",
 sm: "brand-logo-lockup--sm",
 md: "brand-logo-lockup--md",
 lg: "brand-logo-lockup--lg",
};

export function BrandLogoLink({ href = "/", size = "md", className }) {
 return (
  <Link
   href={href}
   className={cn("group inline-flex shrink-0", className)}
   aria-label={`${brandSlug} — ana sayfa`}
  >
   <span
    className={cn(
     "brand-logo-lockup brand-logo transition-opacity duration-200 group-hover:opacity-90",
     sizeClasses[size]
    )}
   >
    <span className="brand-logo-wordmark">{brandSlug}</span>
   </span>
  </Link>
 );
}
