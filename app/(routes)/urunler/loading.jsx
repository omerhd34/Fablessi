import { ProductsCatalogSkeleton } from "@/components/status/products-catalog-skeleton";

export default function UrunlerLoadingPage() {
 return (
  <div className="container-premium page-content-offset pb-20 md:pb-28">
   <ProductsCatalogSkeleton />
  </div>
 );
}
