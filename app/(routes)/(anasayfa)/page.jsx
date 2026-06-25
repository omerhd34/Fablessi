import dynamic from "next/dynamic";
import { preload } from "react-dom";
import { getImageProps } from "next/image";
import { HeroSection } from "@/components/home/hero-section";
import { IMAGE_QUALITY_HERO } from "@/lib/image-config";
import { heroSlidesData } from "@/lib/i18n/hero-slides-data";
import { getHomePageData } from "@/lib/queries/home";

const CategoriesShowcase = dynamic(() =>
 import("@/components/home/categories-showcase").then(
  (module) => module.CategoriesShowcase
 )
);

const FeaturedProductsGrid = dynamic(() =>
 import("@/components/home/featured-products-grid").then(
  (module) => module.FeaturedProductsGrid
 )
);

const BrandExperienceBanner = dynamic(() =>
 import("@/components/home/brand-experience-banner").then(
  (module) => module.BrandExperienceBanner
 )
);

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
  quality: IMAGE_QUALITY_HERO,
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
