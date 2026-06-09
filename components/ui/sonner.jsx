"use client";

import { Toaster as Sonner } from "sonner";

const favoriteToasterOffset = {
 bottom: "1.5rem",
};

function Toaster({ offset, mobileOffset, ...props }) {
 return (
  <Sonner
   theme="light"
   className="toaster group"
   style={{
    "--normal-bg": "var(--popover)",
    "--normal-text": "var(--popover-foreground)",
    "--normal-border": "var(--border)",
    "--border-radius": "var(--radius)",
   }}
   toastOptions={{
    classNames: {
     toast:
      "group toast group-[.toaster]:rounded-2xl group-[.toaster]:border-charcoal/10 group-[.toaster]:bg-white/96 group-[.toaster]:text-charcoal group-[.toaster]:shadow-[0_12px_40px_rgb(0_0_0/12%)] group-[.toaster]:backdrop-blur-md",
     description: "group-[.toast]:text-muted-foreground",
     actionButton: "group-[.toast]:bg-charcoal group-[.toast]:text-white",
     cancelButton: "group-[.toast]:bg-cream group-[.toast]:text-charcoal",
     closeButton:
      "group-[.toast]:border-charcoal/10 group-[.toast]:bg-white group-[.toast]:text-charcoal/55 group-[.toast]:hover:bg-charcoal/6",
    },
   }}
   offset={offset ?? favoriteToasterOffset}
   mobileOffset={mobileOffset ?? favoriteToasterOffset}
   {...props}
  />
 );
}

export { Toaster };
