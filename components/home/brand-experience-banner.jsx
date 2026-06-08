"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/locale-provider";

export function BrandExperienceBanner() {
 const { t } = useLocale();

 return (
  <section className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
   <Image
    src="/velar-oturma/01.jpg"
    alt={t("home.brandExperienceAlt")}
    fill
    sizes="100vw"
    className="object-cover"
   />
   <div className="absolute inset-0 bg-black/45" />
   <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
    <p className="text-xs font-semibold tracking-[0.35em] uppercase">
     {t("home.brandExperienceEyebrow")}
    </p>
    <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight md:text-4xl">
     {t("home.brandExperienceTitle")}
    </h2>
    <p className="mt-4 max-w-xl text-sm text-white/85 md:text-base">
     {t("home.brandExperienceDescription")}
    </p>
    <Link
     href="/hakkimizda"
     className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-charcoal transition hover:bg-white/90"
    >
     {t("home.brandExperienceCta")}
    </Link>
   </div>
  </section>
 );
}
