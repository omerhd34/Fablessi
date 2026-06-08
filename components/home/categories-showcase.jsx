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

function CategoryCard({ category, variant = "desktop" }) {
 const isMobile = variant === "mobile";

 return (
  <Link href={category.href} className="group/card block">
   <div className="product-card-kalif relative aspect-4/5 overflow-hidden rounded-3xl sm:rounded-[1.25rem]">
    <Image
     src={category.image}
     alt={category.label}
     fill
     sizes={isMobile ? "48vw" : "(max-width: 640px) 88vw, 33vw"}
     className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
    />
    <div
     className={
      isMobile
       ? "pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent"
       : "pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"
     }
    />
    {isMobile ? (
     <span className="absolute bottom-3.5 left-3.5 text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgb(0_0_0/45%)]">
      {category.label}
     </span>
    ) : (
     <div className="absolute right-3 bottom-3 left-3">
      <span className="inline-flex rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm">
       {category.label}
      </span>
     </div>
    )}
   </div>
  </Link>
 );
}

export function CategoriesShowcase() {
 if (!categories.length) {
  return null;
 }

 return (
  <>
   <section className="section-padding bg-white sm:hidden" aria-label="Kategoriler">
    <div className="container-premium">
     <h2 className="heading-display text-charcoal mb-6 text-left">Kategoriler</h2>
     <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
       <CategoryCard key={category.slug} category={category} variant="mobile" />
      ))}
     </div>
    </div>
   </section>

   <HomeShowcaseSlider
    className="hidden sm:block"
    title="Kategoriler"
    description="Oturma gruplarından şezlonglara; dış mekân mobilyası kategorilerini keşfedin."
    action={{ href: "/urunler", label: "Tüm Kategoriler" }}
    itemCount={categories.length}
   >
    {categories.map((category) => (
     <HomeShowcaseSlide key={category.slug}>
      <CategoryCard category={category} />
     </HomeShowcaseSlide>
    ))}
   </HomeShowcaseSlider>
  </>
 );
}
