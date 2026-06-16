"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "@/lib/icons";
import {
 HomeShowcaseSlide,
 HomeShowcaseSlider,
} from "@/components/home/home-showcase-slider";
import { useMemo } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import {
 containerPremiumClass,
 headingDisplayClass,
 productCardKalifClass,
 sectionPaddingClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

function CategoryCard({ category, variant = "desktop" }) {
 const isStacked = variant === "stacked" || variant === "mobile";

 const labelClassName =
  "scale-100 origin-left transition-[scale] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105 motion-reduce:duration-150";

 const badgeClassName =
  "inline-flex rounded-full border border-white/20 bg-white/15 font-semibold text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md";

 return (
  <Link href={category.href} className="group/card block">
   <div
    className={cn(
     productCardKalifClass,
     "relative rounded-3xl sm:rounded-[1.25rem]",
     isStacked ? "h-48 sm:h-52 md:h-56 lg:h-60" : "aspect-3/2"
    )}
   >
    <Image
     src={category.image}
     alt={category.label}
     fill
     sizes="50vw"
     className="size-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03] motion-reduce:duration-150"
    />
    <div
     className={
      isStacked
       ? "pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent"
       : "pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"
     }
    />
    <div className="absolute right-3 bottom-3 left-3">
     <span
      className={cn(
       labelClassName,
       badgeClassName,
       isStacked ? "px-3 py-1.5 text-xs" : "px-3.5 py-1.5 text-xs"
      )}
     >
      {category.label}
     </span>
    </div>
   </div>
  </Link>
 );
}

export function CategoriesShowcase() {
 const { navigation, t } = useTranslations();
 const categories = useMemo(
  () =>
   navigation.productsMegaMenu.groups
    .map((group) => ({
     slug: group.slug,
     label: group.label,
     href: group.href,
     image: group.items[0]?.image,
    }))
    .filter((category) => category.image),
  [navigation]
 );

 if (!categories.length) {
  return null;
 }

 return (
  <>
   <section
    className={cn(sectionPaddingClass, "bg-white block desktop:hidden")}
    aria-label={t("categories.categoriesAria")}
   >
    <div className={containerPremiumClass}>
     <div className="mb-8 text-center sm:mb-10 md:mb-14">
      <h2 className={cn(headingDisplayClass, "text-charcoal")}>
       {t("home.categoriesTitle")}
      </h2>
      <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
       {t("home.categoriesDescription")}
      </p>
      <Link
       href="/urunler"
       className="mt-4 inline-flex scale-100 origin-center items-center gap-1 text-sm font-semibold text-charcoal/70 transition-[scale,color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:text-charcoal motion-reduce:duration-150"
      >
       {t("categories.allCategories")}
       <ChevronRight className="size-4 shrink-0" aria-hidden />
      </Link>
     </div>
     <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
      {categories.map((category) => (
       <CategoryCard key={category.slug} category={category} variant="stacked" />
      ))}
     </div>
    </div>
   </section>

   <HomeShowcaseSlider
    className="hidden desktop:block"
    title={t("home.categoriesTitle")}
    description={t("home.categoriesDescription")}
    action={{ href: "/urunler", label: t("categories.allCategories") }}
    itemCount={categories.length}
    slidesPerView={2}
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
