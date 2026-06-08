"use client";

import { Collections, Explore, ShieldCheck } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";

const featureIconMap = {
 design: Explore,
 material: ShieldCheck,
 range: Collections,
};

export function ProductionSupplierFeatures() {
 const { dictionary } = useTranslations();
 const { supplierFeatures } = dictionary.production;

 return (
  <div className="production-features mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-14">
   {supplierFeatures.map((feature) => {
    const Icon = featureIconMap[feature.icon] ?? Explore;

    return (
     <article
      key={feature.title}
      className="production-features__item flex flex-col items-center text-center"
     >
      <div className="production-features__icon" aria-hidden>
       <Icon className="size-7 text-charcoal/70" />
      </div>
      <h3 className="mt-5 font-display text-[0.78rem] tracking-[0.22em] text-charcoal uppercase">
       {feature.title}
      </h3>
      <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-charcoal/72 md:text-[0.95rem]">
       {feature.description}
      </p>
     </article>
    );
   })}
  </div>
 );
}
