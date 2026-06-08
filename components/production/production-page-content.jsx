"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductionSupplierFeatures } from "@/components/production/production-supplier-features";
import { useTranslations } from "@/contexts/locale-provider";

export function ProductionPageContent() {
 const { dictionary } = useTranslations();
 const { production } = dictionary;

 return (
  <>
   <section className="production-intro pb-12 md:pb-14">
    <div className="container-premium">
     <p className="mx-auto max-w-2xl text-center font-body text-sm leading-relaxed text-charcoal/75 md:text-[0.95rem]">
      {production.intro}
     </p>
    </div>
   </section>

   <section
    className="production-supplier section-padding-sm"
    aria-labelledby="production-supplier-heading"
   >
    <div className="container-premium">
     <div className="production-supplier__image relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[21/9]">
      <Image
       src="/BotanicaGarden.jpeg"
       alt={production.supplierImageAlt}
       fill
       sizes="(max-width: 1280px) 100vw, 1200px"
       className="object-cover object-center"
       priority
      />
     </div>

     <div className="mx-auto mt-10 max-w-3xl text-center md:mt-12">
      <p className="font-display text-[0.65rem] tracking-[0.3em] text-charcoal/50 uppercase">
       {production.supplierEyebrow}
      </p>
      <h2
       id="production-supplier-heading"
       className="production-supplier__brand mt-3 font-display text-2xl font-semibold text-charcoal uppercase md:text-3xl"
      >
       {production.supplierName}
      </h2>
      <p className="mt-3 font-display text-[0.7rem] tracking-[0.24em] text-charcoal/60 uppercase">
       {production.supplierTagline} · {production.supplierScope}
      </p>
     </div>

     <div className="mx-auto mt-12 max-w-3xl text-center md:mt-14">
      <h3 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase">
       {production.supplierAboutTitle}
      </h3>
      <div className="mt-8 space-y-5 text-left md:space-y-6">
       {production.supplierAboutParagraphs.map((paragraph) => (
        <p
         key={paragraph.slice(0, 48)}
         className="font-body text-sm leading-[1.8] text-charcoal/78 md:text-center md:text-[0.95rem]"
        >
         {paragraph}
        </p>
       ))}
      </div>
     </div>

     <ProductionSupplierFeatures />
    </div>
   </section>

   <section
    className="production-partnership section-padding-sm"
    aria-labelledby="production-partnership-heading"
   >
    <div className="container-premium">
     <div className="mx-auto max-w-2xl text-center">
      <h2
       id="production-partnership-heading"
       className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.32em] text-charcoal uppercase"
      >
       {production.partnershipTitle}
      </h2>
      <p className="mt-5 font-body text-sm leading-relaxed text-charcoal/72 md:text-[0.95rem]">
       {production.partnershipDescription}
      </p>
     </div>

     <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6 lg:mt-12">
      {production.pillars.map((pillar) => (
       <article
        key={pillar.title}
        className="production-partnership__card rounded-2xl px-6 py-8 text-center"
       >
        <h3 className="font-display text-[0.72rem] tracking-[0.26em] text-charcoal uppercase">
         {pillar.title}
        </h3>
        <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/72">
         {pillar.description}
        </p>
       </article>
      ))}
     </div>
    </div>
   </section>

   <section className="container-premium pb-20 md:pb-28">
    <div className="production-cta rounded-2xl px-6 py-10 text-center text-white md:px-10 md:py-12">
     <h2 className="font-display text-[clamp(1rem,2.2vw,1.35rem)] font-normal tracking-[0.28em] uppercase">
      {production.ctaTitle}
     </h2>
     <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/82 md:text-[0.95rem]">
      {production.ctaDescription}
     </p>
     <Link
      href="/iletisim"
      className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-charcoal transition hover:bg-white/92"
     >
      {production.ctaButton}
     </Link>
    </div>
   </section>
  </>
 );
}
