"use client";

import { ProductCard } from "@/components/catalog/product-card";
import {
 HomeShowcaseSlide,
 HomeShowcaseSlider,
} from "@/components/home/home-showcase-slider";

export function FeaturedProductsGrid({ products }) {
 return (
  <HomeShowcaseSlider
   title="Öne Çıkan Ürünler"
   description="Satışa öncelik verdiğimiz seçili modelleri keşfedin."
   itemCount={products.length}
  >
   {products.map((product, index) => (
    <HomeShowcaseSlide key={product.id}>
     <ProductCard product={product} priority={index < 3} />
    </HomeShowcaseSlide>
   ))}
  </HomeShowcaseSlider>
 );
}
