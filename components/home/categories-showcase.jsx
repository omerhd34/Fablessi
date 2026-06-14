"use client";

import Image from "next/image";
import Link from "next/link";
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
 const isMobile = variant === "mobile";

 const labelClassName =
  "scale-100 origin-left transition-[scale] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105 motion-reduce:duration-150";

 const badgeClassName =
  "inline-flex rounded-full border border-white/20 bg-white/15 font-semibold text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md";

 return (
  <Link href={category.href} className="group/card block">
   <div className={cn(productCardKalifClass, "relative aspect-4/5 rounded-3xl sm:rounded-[1.25rem]")}>
    <Image
     src={category.image}
     alt={category.label}
     fill
     sizes={isMobile ? "48vw" : "(max-width: 640px) 88vw, 33vw"}
     className="size-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03] motion-reduce:duration-150"
    />
    <div
     className={
      isMobile
       ? "pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent"
       : "pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"
     }
    />
    {isMobile ? (
     <div className="absolute right-3 bottom-3 left-3">
      <span className={cn(labelClassName, badgeClassName, "px-3 py-1.5 text-xs")}>
       {category.label}
      </span>
     </div>
    ) : (
     <div className="absolute right-3 bottom-3 left-3">
      <span className={cn(labelClassName, badgeClassName, "px-3.5 py-1.5 text-xs")}>
       {category.label}
      </span>
     </div>
    )}
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
    className={cn(sectionPaddingClass, "bg-white sm:hidden")}
    aria-label={t("categories.categoriesAria")}
   >
    <div className={containerPremiumClass}>
     <h2 className={cn(headingDisplayClass, "mb-6 text-left text-charcoal")}>
      {t("home.categoriesTitle")}
     </h2>
     <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
       <CategoryCard key={category.slug} category={category} variant="mobile" />
      ))}
     </div>
    </div>
   </section>

   <HomeShowcaseSlider
    className="hidden sm:block"
    title={t("home.categoriesTitle")}
    description={t("home.categoriesDescription")}
    action={{ href: "/urunler", label: t("categories.allCategories") }}
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
