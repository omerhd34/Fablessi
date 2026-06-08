"use client";

import Image from "next/image";
import Link from "next/link";
import {
 HomeShowcaseSlide,
 HomeShowcaseSlider,
} from "@/components/home/home-showcase-slider";
import { productsMegaMenu } from "@/lib/navigation";

const categories = productsMegaMenu.groups
 .map((group) => ({
  slug: group.slug,
  label: group.label,
  href: group.href,
  image: group.items[0]?.image,
 }))
 .filter((category) => category.image);

export function CategoriesShowcase() {
 return (
  <HomeShowcaseSlider
   title="Kategoriler"
   description="Oturma gruplarından şezlonglara; dış mekân mobilyası kategorilerini keşfedin."
   action={{ href: "/urunler", label: "Tüm Kategoriler" }}
   itemCount={categories.length}
  >
   {categories.map((category) => (
    <HomeShowcaseSlide key={category.slug}>
     <Link href={category.href} className="group/card block">
      <div className="product-card-kalif relative aspect-4/5 overflow-hidden">
       <Image
        src={category.image}
        alt={category.label}
        fill
        sizes="(max-width: 640px) 88vw, 33vw"
        className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
       />
       <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
       <div className="absolute right-3 bottom-3 left-3">
        <span className="inline-flex rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm">
         {category.label}
        </span>
       </div>
      </div>
     </Link>
    </HomeShowcaseSlide>
   ))}
  </HomeShowcaseSlider>
 );
}
