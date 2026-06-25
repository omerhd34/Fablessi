"use client";

import { ProductCard } from "@/components/catalog/product-card";
import {
 HomeShowcaseSlide,
 HomeShowcaseSlider,
} from "@/components/home/home-showcase-slider";
import { useLocale } from "@/contexts/locale-provider";

export function FeaturedProductsGrid({ products }) {
 const { t } = useLocale();

 return (
  <HomeShowcaseSlider
   id="one-cikan-urunler"
   title={t("home.featuredTitle")}
   description={t("home.featuredDescription")}
   action={{ href: "/urunler", label: t("nav.products") }}
   itemCount={products.length}
   slidesPerView={2}
  >
   {products.map((product, index) => (
    <HomeShowcaseSlide key={product.id}>
     <ProductCard
      product={product}
      variant="featured"
      priority={index < 2}
      showFavoriteButton
     />
    </HomeShowcaseSlide>
   ))}
  </HomeShowcaseSlider>
 );
}
