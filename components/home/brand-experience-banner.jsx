"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/locale-provider";

export function BrandExperienceBanner() {
 const { t } = useLocale();

 return (
  <section className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
   <Image
    src="https://res.cloudinary.com/dbo6puh1c/image/upload/v1781205876/fablessi/velar-oturma/01.jpg"
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
     className="mt-8 inline-flex h-11 scale-100 items-center justify-center rounded-full border border-white/35 bg-white/15 px-8 text-sm font-semibold text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md transition-[scale,background-color,border-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:border-white/50 hover:bg-white/22 active:scale-100 motion-reduce:duration-150"
    >
     {t("home.brandExperienceCta")}
    </Link>
   </div>
  </section>
 );
}
