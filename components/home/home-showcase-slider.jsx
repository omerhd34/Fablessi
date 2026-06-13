"use client";

import Link from "next/link";
import { ChevronRight, HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
 Carousel,
 CarouselContent,
 CarouselDots,
 CarouselItem,
 useCarousel,
} from "@/components/ui/carousel";

const slideClassName = "basis-full sm:basis-1/3 sm:pl-5";

const navButtonClassName =
 "header-glass-btn home-showcase-nav inline-flex size-11 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full text-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 sm:size-12";

function HomeShowcaseNav({ direction }) {
 const { scrollPrev, scrollNext, canScrollNext } = useCarousel();
 const isPrev = direction === "prev";
 const disabled = isPrev ? false : !canScrollNext;
 const Icon = isPrev ? HeroChevronLeft : HeroChevronRight;

 return (
  <button
   type="button"
   onClick={isPrev ? scrollPrev : scrollNext}
   disabled={disabled}
   className={navButtonClassName}
   aria-label={isPrev ? "Önceki slayt" : "Sonraki slayt"}
  >
   <Icon strokeWidth={3.5} aria-hidden />
  </button>
 );
}

export function HomeShowcaseSlider({
 id,
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
  <section id={id} className={cn("section-padding bg-white", className)}>
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
     loop: true,
     duration: 28,
     containScroll: "trimSnaps",
     dragFree: false,
     slidesToScroll: 1,
    }}
    className="w-full"
    aria-label={title}
   >
    <div className="mx-auto grid w-full max-w-site-shell grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:gap-4 sm:px-5 md:gap-6 md:px-6 lg:px-8 xl:gap-8 xl:px-10">
     <HomeShowcaseNav direction="prev" />
     <div className="min-w-0">
      <CarouselContent className="sm:-ml-5">
       {children}
      </CarouselContent>
     </div>
     <HomeShowcaseNav direction="next" />
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
