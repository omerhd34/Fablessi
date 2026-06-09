import { ProductDetailSkeleton } from "@/components/status/product-detail-skeleton";

export default function UrunDetayLoadingPage() {
 return (
  <div className="page-content-offset pb-10 md:pb-14">
   <div className="container-premium">
    <ProductDetailSkeleton />
   </div>
  </div>
 );
}
