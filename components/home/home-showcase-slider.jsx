"use client";

import Link from "next/link";
import { ChevronRight } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
 Carousel,
 CarouselContent,
 CarouselDots,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";

const slideClassName = "basis-full sm:basis-1/3 sm:pl-5";

const navButtonClassName =
 "size-11 rounded-full border-charcoal/12 bg-white text-charcoal shadow-[0_4px_24px_rgb(0_0_0/6%)] transition-all duration-200 hover:border-charcoal/20 hover:bg-cream/60 hover:shadow-[0_8px_32px_rgb(0_0_0/8%)] active:scale-95 disabled:pointer-events-none disabled:opacity-25 sm:size-12";

export function HomeShowcaseSlider({
 title,
 description,
 action,
 itemCount = 0,
 className,
 children,
}) {
 if (!itemCount) {
  return null;
 }

 return (
  <section className={cn("section-padding bg-white", className)}>
   <div className="container-premium">
    <div className="mb-10 text-center md:mb-14">
     <h2 className="heading-display text-charcoal">{title}</h2>
     {description ? (
      <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
       {description}
      </p>
     ) : null}
     {action ? (
      <Link
       href={action.href}
       className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-charcoal/70 transition hover:text-charcoal"
      >
       {action.label}
       <ChevronRight className="size-4 shrink-0" aria-hidden />
      </Link>
     ) : null}
    </div>
   </div>

   <Carousel
    opts={{
     align: "start",
     loop: itemCount > 3,
     duration: 28,
     containScroll: "trimSnaps",
     dragFree: false,
     slidesToScroll: 1,
    }}
    className="w-full"
    aria-label={title}
   >
    <div className="mx-auto grid w-full max-w-site-shell grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:gap-4 sm:px-5 md:gap-6 md:px-6 lg:px-8 xl:gap-8 xl:px-10">
     <CarouselPrevious
      placement="inline"
      variant="outline"
      size="icon-lg"
      className={navButtonClassName}
     />
     <div className="min-w-0">
      <CarouselContent className="sm:-ml-5">
       {children}
      </CarouselContent>
     </div>
     <CarouselNext
      placement="inline"
      variant="outline"
      size="icon-lg"
      className={navButtonClassName}
     />
    </div>
    <div className="container-premium">
     <CarouselDots className="mt-8" />
    </div>
   </Carousel>
  </section>
 );
}

export function HomeShowcaseSlide({ children, className }) {
 return (
  <CarouselItem className={cn(slideClassName, className)}>
   {children}
  </CarouselItem>
 );
}
