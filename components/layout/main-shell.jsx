"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainShell({ children }) {
 const pathname = usePathname();
 const isHome = pathname === "/";
 const isAdmin = pathname?.startsWith("/admin");

 return (
  <main className={cn("relative z-0 flex-1", !isHome && !isAdmin && "site-inner")}>
   {children}
  </main>
 );
}
