"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const compactToasterOffset = {
 bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
};

const compactToasterMobileOffset = {
 bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
};

export function AppToaster() {
 const pathname = usePathname();
 const isCompact = pathname?.startsWith("/admin");

 return (
  <Toaster
   position="bottom-center"
   gap={10}
   visibleToasts={1}
   offset={isCompact ? compactToasterOffset : undefined}
   mobileOffset={isCompact ? compactToasterMobileOffset : undefined}
   style={isCompact ? { "--width": "22rem" } : undefined}
  />
 );
}
