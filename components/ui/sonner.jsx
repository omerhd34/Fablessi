"use client";

import { Toaster as Sonner } from "sonner";

const favoriteToasterOffset = {
 bottom: "1.5rem",
};

function Toaster({ offset, mobileOffset, ...props }) {
 return (
  <Sonner
   theme="light"
   closeButton
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
      "group toast group-[.toaster]:relative group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:min-h-16 group-[.toaster]:gap-3.5 group-[.toaster]:rounded-2xl group-[.toaster]:border-charcoal/10 group-[.toaster]:bg-white/96 group-[.toaster]:px-6 group-[.toaster]:py-3 group-[.toaster]:pr-14 group-[.toaster]:text-base group-[.toaster]:text-charcoal group-[.toaster]:shadow-[0_12px_40px_rgb(0_0_0/12%)] group-[.toaster]:backdrop-blur-md [&_[data-icon]]:size-6 [&_[data-icon]]:shrink-0 [&_[data-content]]:flex [&_[data-content]]:items-center [&_[data-content]]:min-h-6",
     title: "group-[.toast]:text-base group-[.toast]:font-medium group-[.toast]:leading-snug",
     description: "group-[.toast]:text-sm group-[.toast]:text-muted-foreground",
     actionButton: "group-[.toast]:bg-charcoal group-[.toast]:text-white",
     cancelButton: "group-[.toast]:bg-cream group-[.toast]:text-charcoal",
     closeButton:
      "group-[.toast]:!border-charcoal/10 group-[.toast]:!bg-white group-[.toast]:!text-charcoal/55 group-[.toast]:hover:!bg-charcoal/6 group-[.toast]:!cursor-pointer [&_svg]:!size-4",
    },
   }}
   offset={offset ?? favoriteToasterOffset}
   mobileOffset={mobileOffset ?? favoriteToasterOffset}
   {...props}
  />
 );
}

export { Toaster };
