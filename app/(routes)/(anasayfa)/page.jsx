import dynamic from "next/dynamic";
import { HeroLcpPreloads } from "@/components/home/hero-lcp-preloads";
import { HeroSection } from "@/components/home/hero-section";
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

export default async function Anasayfa() {
 const { featuredProducts } = await getHomePageData();

 return (
  <>
   <HeroLcpPreloads images={heroSlidesData[0].images} />
   <HeroSection />
   <CategoriesShowcase />
   <FeaturedProductsGrid products={featuredProducts} />
   <BrandExperienceBanner />
  </>
 );
}
