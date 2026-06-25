import Image from "next/image";
import Link from "next/link";
import {
 LOGO_DISPLAY_HEIGHT,
 LOGO_DISPLAY_WIDTH,
 LOGO_SIZES,
} from "@/lib/image-config";
import { cn } from "@/lib/utils";

export function AdminLogo({ className, height = "h-8" }) {
 return (
  <Link
   href="/admin"
   className={cn("inline-flex cursor-pointer items-center", className)}
   aria-label="Yönetim paneli"
  >
   <Image
    src="/brand/logo.png"
    alt="Fablessi"
    width={LOGO_DISPLAY_WIDTH}
    height={LOGO_DISPLAY_HEIGHT}
    sizes={LOGO_SIZES}
    style={{ width: "auto", height: "auto" }}
    className={cn("w-auto brightness-0", height)}
    priority
   />
  </Link>
 );
}
