import { ArchitectPicksCarousel } from "@/components/home/architect-picks-carousel";
import { CollectionsShowcase } from "@/components/home/collections-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { LatestProductsGrid } from "@/components/home/latest-products-grid";
import { getHomePageData } from "@/lib/queries/home";

export const revalidate = 60;

export default async function Anasayfa() {
 const { collections, latestProducts, architectPicks } =
  await getHomePageData();

 return (
  <>
   <HeroSection />
   <CollectionsShowcase collections={collections} />
   <LatestProductsGrid products={latestProducts} />
   <ArchitectPicksCarousel products={architectPicks} />
  </>
 );
}
