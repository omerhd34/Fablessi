/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import {
 Carousel,
 CarouselContent,
 CarouselDots,
 CarouselItem,
} from "@/components/ui/carousel";
import { ProductDetailServiceInfo } from "@/components/product/product-detail-service-info";
import { getProductMoreInfo } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function ProductGalleryImage({
 image,
 index,
 onImageClick,
 variant = "stack",
 className,
}) {
 const isSlide = variant === "slide";

 return (
  <button
   type="button"
   onClick={() => onImageClick?.(index)}
   className={cn(
    "relative block w-full cursor-pointer overflow-hidden md:aspect-16/10",
    isSlide
     ? "aspect-4/3 bg-cream/40"
     : "product-gallery-frame aspect-4/3 rounded-3xl bg-white",
    className
   )}
   aria-label={`${image.alt ?? "Ürün görseli"} — büyüt`}
  >
   <Image
    src={image.url}
    alt={image.alt ?? "Ürün görseli"}
    fill
    sizes="(max-width: 768px) 100vw, 60vw"
    className={cn(
     "object-cover transition-transform duration-300",
     !isSlide && "hover:scale-[1.02]"
    )}
    priority={index === 0}
   />
  </button>
 );
}

function ProductGallery({ images, onImageClick }) {
 if (images.length === 0) {
  return (
   <div className="flex aspect-4/3 items-center justify-center rounded-3xl bg-cream/60 text-sm text-charcoal/50">
    Görsel bulunamadı
   </div>
  );
 }

 return (
  <>
   <div className="product-gallery-mobile md:hidden">
    <Carousel
     opts={{
      align: "start",
      loop: false,
      containScroll: "trimSnaps",
     }}
     className="w-full"
     aria-label="Ürün görselleri"
    >
     <CarouselContent className="ml-0">
      {images.map((image, index) => (
       <CarouselItem key={image.id} className="min-w-0 basis-full pl-0">
        <ProductGalleryImage
         image={image}
         index={index}
         onImageClick={onImageClick}
         variant="slide"
        />
       </CarouselItem>
      ))}
     </CarouselContent>
     <CarouselDots className="mt-3" />
    </Carousel>
   </div>

   <div className="hidden space-y-3 md:block md:space-y-4">
    {images.map((image, index) => (
     <ProductGalleryImage
      key={image.id}
      image={image}
      index={index}
      onImageClick={onImageClick}
     />
    ))}
   </div>
  </>
 );
}

export function ProductDetailCenter({
 product,
 images,
 onImageClick,
 className,
}) {
 const moreInfo = getProductMoreInfo(product);
 const [accordionValue, setAccordionValue] = useState([]);

 useEffect(() => {
  if (window.matchMedia("(min-width: 768px)").matches) {
   setAccordionValue(["product-info"]);
  }
 }, []);

 return (
  <div className={cn("space-y-8 md:space-y-10", className)}>
   <ProductGallery images={images} onImageClick={onImageClick} />

   <Accordion
    type="multiple"
    value={accordionValue}
    onValueChange={setAccordionValue}
    className="space-y-4"
   >
    <AccordionItem
     value="product-info"
     className="overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]"
    >
     <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold text-charcoal hover:no-underline">
      Ürün Bilgisi
     </AccordionTrigger>
     <AccordionContent className="pb-5 text-sm leading-relaxed text-charcoal/75">
      {product.description ? <p>{product.description}</p> : null}
      {product.collection?.description ? (
       <p className="mt-4">{product.collection.description}</p>
      ) : null}
     </AccordionContent>
    </AccordionItem>

    <AccordionItem
     value="more-info"
     className="overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]"
    >
     <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold text-charcoal hover:no-underline">
      Daha Fazla Bilgi
     </AccordionTrigger>
     <AccordionContent className="space-y-4 pb-5 text-sm leading-relaxed text-charcoal/75">
      {moreInfo.map((paragraph) => (
       <p key={paragraph}>{paragraph}</p>
      ))}
     </AccordionContent>
    </AccordionItem>

    <AccordionItem
     value="service-info"
     className="overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)] md:hidden"
    >
     <AccordionTrigger className="cursor-pointer py-4 text-base font-semibold text-charcoal hover:no-underline">
      Teknik Bilgiler
     </AccordionTrigger>
     <AccordionContent className="pb-5">
      <ProductDetailServiceInfo product={product} variant="plain" />
     </AccordionContent>
    </AccordionItem>
   </Accordion>

   <ProductDetailServiceInfo
    product={product}
    className="mt-4! hidden md:block"
   />
  </div>
 );
}
