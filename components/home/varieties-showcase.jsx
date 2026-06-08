"use client";

import Image from "next/image";
import Link from "next/link";
import {
 HomeShowcaseSlide,
 HomeShowcaseSlider,
} from "@/components/home/home-showcase-slider";
import { getCollectionProductsHref } from "@/lib/product-utils";
import { getPrimaryImageUrl } from "@/lib/queries/home";

export function VarietiesShowcase({ collections }) {
 const items = collections
  .map((collection) => {
   const cover =
    collection.coverImage ?? getPrimaryImageUrl(collection.products[0] ?? {});

   if (!cover) return null;

   return {
    id: collection.id,
    name: collection.name,
    href: getCollectionProductsHref(collection.slug),
    cover,
   };
  })
  .filter(Boolean);

 return (
  <HomeShowcaseSlider
   title="Çeşitler"
   description="Açelya, Aston, Velar ve diğer serilerimizdeki modelleri keşfedin."
   action={{ href: "/urunler", label: "Tüm Çeşitler" }}
   itemCount={items.length}
  >
   {items.map((collection) => (
    <HomeShowcaseSlide key={collection.id}>
     <Link href={collection.href} className="group/card block">
      <div className="product-card-kalif relative aspect-4/5 overflow-hidden">
       <Image
        src={collection.cover}
        alt={collection.name}
        fill
        sizes="(max-width: 640px) 88vw, 33vw"
        className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
       />
       <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
       <div className="absolute right-3 bottom-3 left-3">
        <span className="inline-flex rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm">
         {collection.name}
        </span>
       </div>
      </div>
     </Link>
    </HomeShowcaseSlide>
   ))}
  </HomeShowcaseSlider>
 );
}
