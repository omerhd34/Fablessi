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
    className={cn("locale-switcher-btn__flag", className)}
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
   className={cn("locale-flag-icon", className)}
   aria-hidden
  />
 );
}
