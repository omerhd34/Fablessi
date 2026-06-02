"use client";

import Image from "next/image";
import Link from "next/link";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";
import { getPrimaryImageUrl } from "@/lib/queries/home";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
 "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80";

export function ArchitectPicksCarousel({ products }) {
 if (!products.length) {
  return null;
 }

 return (
  <section className="section-padding bg-sand/40">
   <div className="container-premium">
    <div className="mb-10 md:mb-14">
     <p className="heading-eyebrow mb-3">Seçki</p>
     <h2 className="heading-display">Mimarın seçimi</h2>
     <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed">
      İç mimarlarımızın öne çıkardığı parçalar — mekânınıza uyumlu,
      zamansız formlar.
     </p>
    </div>

    <Carousel
     opts={{
      align: "start",
      loop: products.length > 2,
     }}
     className="w-full"
    >
     <CarouselContent className="-ml-4 md:-ml-6">
      {products.map((product) => {
       const imageUrl =
        getPrimaryImageUrl(product) ?? PLACEHOLDER;

       return (
        <CarouselItem
         key={product.id}
         className="basis-[85%] pl-4 sm:basis-[55%] md:basis-[42%] md:pl-6 lg:basis-[32%]"
        >
         <Link
          href={`/urunler/${product.slug}`}
          className="group block"
         >
          <div
           className={cn(
            "glass-card relative aspect-3/4 overflow-hidden rounded-sm"
           )}
          >
           <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 85vw, 32vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
           />
           <div className="from-charcoal/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
           <div className="absolute right-0 bottom-0 left-0 p-5 text-white">
            {product.collection?.name && (
             <p className="mb-1 text-[0.6rem] tracking-[0.28em] text-white/70 uppercase">
              {product.collection.name}
             </p>
            )}
            <h3 className="text-lg font-light tracking-tight">
             {product.name}
            </h3>
            {product.dimensions && (
             <p className="mt-1 text-xs text-white/65">
              {product.dimensions}
             </p>
            )}
           </div>
          </div>
         </Link>
        </CarouselItem>
       );
      })}
     </CarouselContent>
     <div className="mt-8 flex justify-end gap-2 pr-2">
      <CarouselPrevious className="static translate-x-0 translate-y-0" />
      <CarouselNext className="static translate-x-0 translate-y-0" />
     </div>
    </Carousel>
   </div>
  </section>
 );
}
