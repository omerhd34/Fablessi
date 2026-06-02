import Link from "next/link";
import { Italiana } from "next/font/google";
import { brandName } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const logoTypeface = Italiana({
 subsets: ["latin", "latin-ext"],
 weight: "400",
 display: "swap",
});

const sizeClasses = {
 sm: "gap-[0.18em] text-[1.2rem] sm:text-[1.32rem]",
 md: "gap-[0.22em] text-[1.55rem] xl:text-[1.75rem]",
};

export function BrandLogoLink({ href = "/", size = "md", className }) {
 const letters = [...brandName];

 return (
  <Link
   href={href}
   className={cn(
    "group inline-flex shrink-0 transition-opacity duration-200 hover:opacity-80",
    className
   )}
   aria-label={`${brandName} — ana sayfa`}
  >
   <span
    className={cn(
     logoTypeface.className,
     "brand-logo inline-flex items-baseline uppercase leading-none tracking-[0.06em] text-white",
     sizeClasses[size]
    )}
   >
    {letters.map((letter, index) => (
     <span key={`${letter}-${index}`} className="inline-block">
      {letter}
     </span>
    ))}
   </span>
  </Link>
 );
}
