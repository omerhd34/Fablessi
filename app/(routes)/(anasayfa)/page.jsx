import { preload } from "react-dom";
import { getImageProps } from "next/image";
import { BrandExperienceBanner } from "@/components/home/brand-experience-banner";
import { CategoriesShowcase } from "@/components/home/categories-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProductsGrid } from "@/components/home/featured-products-grid";
import { heroSlidesData } from "@/lib/i18n/hero-slides-data";
import { getHomePageData } from "@/lib/queries/home";

export const revalidate = 60;

function preloadHeroLcpImage() {
 const firstSlide = heroSlidesData[0];
 const { props } = getImageProps({
  src: firstSlide.images.sm,
  alt: "",
  width: 1080,
  height: 1920,
  sizes: "100vw",
  priority: true,
 });

 preload(props.src, {
  as: "image",
  imageSrcSet: props.srcSet,
  imageSizes: props.sizes,
 });
}

export default async function Anasayfa() {
 preloadHeroLcpImage();
 const { featuredProducts } = await getHomePageData();

 return (
  <>
   <HeroSection />
   <CategoriesShowcase />
   <FeaturedProductsGrid products={featuredProducts} />
   <BrandExperienceBanner />
  </>
 );
}
