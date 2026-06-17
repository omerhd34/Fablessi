"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "@/contexts/locale-provider";

export function MobileProductsCategoryGrid({ onClose }) {
 const { navigation } = useTranslations();
 const menuCategories = useMemo(
  () =>
   navigation.productsMegaMenu.groups.map((group) => ({
    slug: group.slug,
    label: group.label,
    href: group.href,
    image: group.items[0]?.image,
   })),
  [navigation]
 );

 return (
  <div className="grid grid-cols-2 gap-2.5 pb-2 sm:gap-3">
   {menuCategories.map((category) => (
    <Link
     key={category.slug}
     href={category.href}
     onClick={onClose}
     className="group relative block aspect-3/2 overflow-hidden rounded-2xl bg-cream/60 min-[49rem]:aspect-auto min-[49rem]:h-52"
    >
     {category.image ? (
      <>
       <Image
        src={category.image}
        alt={category.label}
        fill
        sizes="(max-width: 640px) 50vw, 45vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
       />
       <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
       <span className="absolute bottom-2.5 left-2.5 inline-flex rounded-full border border-white/35 bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:bottom-3.5 sm:left-3.5 sm:px-3.5 sm:text-sm">
        {category.label}
       </span>
      </>
     ) : null}
    </Link>
   ))}
  </div>
 );
}
