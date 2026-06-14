import Image from "next/image";
import { cn } from "@/lib/utils";

const flagSrcMap = {
 tr: "/flags/tr.svg",
 en: "/flags/us.svg",
};

export function LocaleFlagIcon({ locale, className, variant = "menu" }) {
 const src = flagSrcMap[locale];
 if (!src) return null;

 if (variant === "trigger") {
  return (
   <Image
    src={src}
    alt=""
    width={22}
    height={22}
    unoptimized
    className={cn(
     "size-[1.375rem] rounded-full object-cover lg:size-[1.45rem]",
     className
    )}
    aria-hidden
   />
  );
 }

 return (
  <Image
   src={src}
   alt=""
   width={24}
   height={24}
   unoptimized
   className={cn("locale-flag-icon size-6 shrink-0 rounded-full object-cover", className)}
   aria-hidden
  />
 );
}
