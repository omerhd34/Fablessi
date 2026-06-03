"use client";

import Image from "next/image";
import Link from "next/link";
import { productsMegaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function ProductsMegaMenu({ open }) {
 const { categories, featured } = productsMegaMenu;

 return (
  <div
   className={cn(
    "absolute inset-x-0 top-full z-50 border-t border-white/10 bg-black transition-[opacity,visibility] ease-out",
    open
     ? "visible opacity-100 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
     : "pointer-events-none invisible opacity-0 duration-300 ease-in"
   )}
   aria-hidden={!open}
  >
   <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-10 px-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14 lg:px-12 lg:py-12">
    <MegaMenuColumn title="Kategoriler" items={categories} />

    <Link
     href={featured.href}
     className="group relative block min-h-[220px] overflow-hidden lg:min-h-[280px]"
    >
     <Image
      src={featured.image}
      alt={featured.title}
      fill
      sizes="(max-width: 1024px) 100vw, 40vw"
      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
     />
     <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
     <div className="absolute right-0 bottom-0 left-0 p-6 text-right text-white lg:p-8">
      <p className="font-display text-[0.65rem] tracking-[0.28em] text-white/70 uppercase">
       {featured.subtitle}
      </p>
      <p className="font-display mt-2 text-xl font-normal tracking-[0.12em] uppercase md:text-2xl">
       {featured.title}
      </p>
      <p className="mt-2 text-sm text-white/80 italic md:text-base">
       {featured.designer}
      </p>
     </div>
    </Link>
   </div>
  </div>
 );
}

function MegaMenuColumn({ title, items = [] }) {
 return (
  <div>
   {title ? (
    <p className="font-display mb-5 text-[0.6rem] tracking-[0.32em] text-white/50 uppercase">
     {title}
    </p>
   ) : null}
   <ul className="flex flex-col gap-2.5">
    {items.map((item) => (
     <li key={item.href}>
      <Link
       href={item.href}
       className="text-[0.8rem] text-white/85 transition-colors hover:text-white md:text-[0.85rem]"
      >
       {item.label}
      </Link>
     </li>
    ))}
   </ul>
  </div>
 );
}
