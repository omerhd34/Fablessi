"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";
import {
 headerGlassBtnClass,
 heroMegaMenuScrollClass,
 heroNavLinkOverlayClass,
 lightMegaMenuArrowClass,
 lightMegaMenuPanelClass,
 lightMegaMenuTitleClass,
 lightMegaMenuViewAllClass,
} from "@/lib/layout/header-styles";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

function ProductMenuCard({ item }) {
 return (
  <Link href={item.href} className="group block">
   <div className="relative aspect-square overflow-hidden rounded-2xl border border-(--glass-border) bg-(--glass-surface) shadow-[0_2px_12px_rgb(0_0_0/6%)]">
    <Image
     src={item.image}
     alt={item.label}
     fill
     sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 13vw"
     className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
    <span
     className="absolute right-4 bottom-2.5 left-2.5 truncate pr-1 text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgb(0_0_0/45%)]"
     title={item.label}
    >
     {item.label}
    </span>
   </div>
  </Link>
 );
}

function handleMegaMenuWheel(event) {
 const element = event.currentTarget;
 const { scrollTop, scrollHeight, clientHeight } = element;
 const maxScroll = scrollHeight - clientHeight;
 const scrollingUp = event.deltaY < 0;
 const scrollingDown = event.deltaY > 0;

 if (
  (scrollingUp && scrollTop > 0) ||
  (scrollingDown && scrollTop < maxScroll - 1)
 ) {
  event.stopPropagation();
  return;
 }

 event.preventDefault();
 event.stopPropagation();
}

const megaMenuArrowClass = cn(
 headerGlassBtnClass,
 heroNavLinkOverlayClass,
 lightMegaMenuArrowClass,
 "products-mega-menu-arrow absolute top-1/2! z-2 -translate-y-1/2! cursor-pointer disabled:opacity-0 [&_svg]:size-5 md:[&_svg]:size-[1.375rem] [&_svg]:[stroke-width:3.5]"
);

export function ProductsMegaMenu({ open, panelRef }) {
 const { navigation, t } = useTranslations();
 const { groups } = navigation.productsMegaMenu;
 const scrollRef = useRef(null);

 useEffect(() => {
  if (!open) return;

  const scrollElement = scrollRef.current;
  if (!scrollElement) return;

  const onWheel = (event) => handleMegaMenuWheel(event);
  const onTouchMove = (event) => {
   if (scrollRef.current?.contains(event.target)) return;
   event.preventDefault();
  };

  scrollElement.addEventListener("wheel", onWheel, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });

  return () => {
   scrollElement.removeEventListener("wheel", onWheel);
   document.removeEventListener("touchmove", onTouchMove);
  };
 }, [open]);

 return (
  <div
   data-open={open ? "true" : undefined}
   className={cn(
    "products-mega-menu-root pointer-events-none absolute inset-x-0 top-full z-50 pt-3",
    open
     ? "visible opacity-100 transition-none"
     : "invisible opacity-0 transition-opacity duration-200 ease-in"
   )}
   aria-hidden={!open}
  >
   <div className={containerPremiumClass}>
    <div
     ref={panelRef}
     className={cn(
      "products-mega-menu-panel overflow-hidden rounded-4xl border border-(--glass-hero-border) bg-(--glass-hero-surface)! p-3 pr-4 shadow-(--glass-hero-shadow) [backdrop-filter:var(--glass-hero-blur)] [-webkit-backdrop-filter:var(--glass-hero-blur)] md:p-5 md:pr-6",
      lightMegaMenuPanelClass
     )}
    >
     <div
      ref={scrollRef}
      className={cn(
       "products-mega-menu-scroll max-h-[min(72vh,44rem)] overflow-x-hidden overflow-y-auto overscroll-contain pe-1 [scrollbar-color:oklch(0.62_0.01_260/0.38)_transparent] scrollbar-thin hover:[&::-webkit-scrollbar-thumb]:bg-charcoal/48 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-charcoal/32 [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1",
       heroMegaMenuScrollClass
      )}
     >
      <div className="space-y-6">
       {groups.map((group) => (
        <section key={group.slug} aria-label={group.label}>
         <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <h3
           className={cn(
            "products-mega-menu-section-title text-sm font-bold tracking-[-0.01em] text-white/96 [text-shadow:0_1px_10px_oklch(0_0_0/45%)] md:text-base",
            lightMegaMenuTitleClass
           )}
          >
           {group.label}
          </h3>
          <Link
           href={group.href}
           className={cn(
            "products-mega-menu-view-all inline-flex shrink-0 origin-right items-center gap-0.5 text-[0.8125rem] font-semibold text-white/92 transition-[color,transform] duration-200 [text-shadow:0_1px_8px_oklch(0_0_0/40%)] hover:scale-110 hover:text-white",
            lightMegaMenuViewAllClass
           )}
          >
           {t("categories.viewAll")}
           <ChevronRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
         </div>

         <Carousel
          opts={{
           align: "start",
           dragFree: true,
           loop: group.items.length > 5,
          }}
          className="w-full"
         >
          <CarouselContent className="-ml-2.5 md:-ml-3">
           {group.items.map((item) => (
            <CarouselItem
             key={item.href}
             className="basis-[42%] pl-2.5 sm:basis-[30%] md:basis-[22%] md:pl-3 lg:basis-[15%] xl:basis-[13.5%]"
            >
             <ProductMenuCard item={item} />
            </CarouselItem>
           ))}
          </CarouselContent>

          {group.items.length > 4 ? (
           <>
            <CarouselPrevious
             variant="ghost"
             className={cn(megaMenuArrowClass, "products-mega-menu-arrow--prev left-1! right-auto! size-9 md:left-2! md:size-10")}
            />
            <CarouselNext
             variant="ghost"
             className={cn(megaMenuArrowClass, "products-mega-menu-arrow--next right-1! left-auto! size-9 md:right-2! md:size-10")}
            />
           </>
          ) : null}
         </Carousel>
        </section>
       ))}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
