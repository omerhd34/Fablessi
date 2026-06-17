"use client";

import { Toaster as Sonner } from "sonner";

const favoriteToasterOffset = {
 bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
};

const favoriteToasterMobileOffset = {
 bottom: "calc(5rem + env(safe-area-inset-bottom, 0px))",
};

function Toaster({ offset, mobileOffset, ...props }) {
 return (
  <Sonner
   theme="light"
   closeButton
   className="toaster group z-100"
   style={{
    "--normal-bg": "var(--popover)",
    "--normal-text": "var(--popover-foreground)",
    "--normal-border": "var(--border)",
    "--border-radius": "var(--radius)",
   }}
   toastOptions={{
    classNames: {
     toast:
      "group toast group-[.toaster]:relative group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:min-h-14 group-[.toaster]:gap-3 group-[.toaster]:rounded-2xl group-[.toaster]:border-charcoal/10 group-[.toaster]:bg-white/96 group-[.toaster]:!px-5 group-[.toaster]:!py-3.5 group-[.toaster]:!pr-12 group-[.toaster]:text-base group-[.toaster]:text-charcoal group-[.toaster]:shadow-[0_12px_40px_rgb(0_0_0/12%)] group-[.toaster]:backdrop-blur-md [&_[data-icon]]:!m-0 [&_[data-icon]]:flex [&_[data-icon]]:size-6 [&_[data-icon]]:shrink-0 [&_[data-icon]]:items-center [&_[data-icon]]:justify-center [&_[data-content]]:flex [&_[data-content]]:min-h-6 [&_[data-content]]:items-center",
     title:
      "group-[.toast]:text-base group-[.toast]:font-medium group-[.toast]:!leading-6",
     description: "group-[.toast]:text-sm group-[.toast]:text-muted-foreground",
     actionButton: "group-[.toast]:bg-charcoal group-[.toast]:text-white",
     cancelButton: "group-[.toast]:bg-cream group-[.toast]:text-charcoal",
     closeButton:
      "group-[.toast]:!flex group-[.toast]:!size-8 group-[.toast]:!items-center group-[.toast]:!justify-center group-[.toast]:!rounded-full group-[.toast]:!border-0 group-[.toast]:!bg-transparent group-[.toast]:!text-charcoal/55 group-[.toast]:!shadow-none group-[.toast]:hover:!bg-charcoal/6 group-[.toast]:hover:!text-charcoal group-[.toast]:!cursor-pointer group-[.toast]:!transition-colors [&_svg]:!size-4",
    },
   }}
   offset={offset ?? favoriteToasterOffset}
   mobileOffset={mobileOffset ?? favoriteToasterMobileOffset}
   {...props}
  />
 );
}

export { Toaster };
