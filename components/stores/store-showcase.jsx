"use client";

import Link from "next/link";
import { FaLocationArrow, Mail, Phone } from "@/lib/icons";
import { flagshipStore } from "@/lib/stores";

export function StoreShowcase() {
 const store = flagshipStore;

 return (
  <div className="space-y-10 md:space-y-12">
   <h1 className="text-center text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">
    Mağazalar
   </h1>

   <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12">
    <div className="flex min-w-0 flex-col gap-6">
     <div className="space-y-4 text-sm leading-relaxed text-charcoal/85 md:text-[0.95rem]">
      <h2 className="font-display text-base font-semibold tracking-[0.18em] text-charcoal uppercase md:text-lg">
       {store.name}
      </h2>

      <p>{store.address}</p>

      <div className="space-y-1">
       {store.hours.map((slot) => (
        <p key={slot.label}>
         {slot.label}: {slot.hours}
        </p>
       ))}
      </div>

      <div className="space-y-2 pt-1">
       <p className="flex items-center gap-2.5">
        <Phone className="size-4 shrink-0 text-charcoal/50" />
        <span>
         Randevu için:{" "}
         <a
          href={store.phoneHref}
          className="underline underline-offset-2 transition-colors hover:text-charcoal"
         >
          {store.phone}
         </a>
        </span>
       </p>
       <p className="flex items-center gap-2.5">
        <Mail className="size-4 shrink-0 text-charcoal/50" />
        <a
         href={`mailto:${store.email}`}
         className="transition-colors hover:text-charcoal"
        >
         {store.email}
        </a>
       </p>
      </div>
     </div>

     <div className="flex justify-end border-t border-charcoal/10 pt-4">
      <Link
       href={store.mapUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="inline-flex items-center gap-1.5 font-display text-[0.65rem] tracking-[0.22em] text-charcoal/70 uppercase transition-colors hover:text-charcoal"
      >
       <FaLocationArrow className="size-3.5 shrink-0" aria-hidden />
       Haritada göster
      </Link>
     </div>
    </div>

    <div className="store-map lg:sticky lg:top-[calc(var(--header-height-desktop)+1.5rem)] lg:self-start">
     <iframe
      title={`${store.name} konumu`}
      src={store.mapEmbedUrl}
      className="store-map__embed"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
     />
    </div>
   </div>
  </div>
 );
}
