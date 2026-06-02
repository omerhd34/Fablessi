import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";

export function LatestProductsGrid({ products }) {
 if (!products.length) {
  return null;
 }

 return (
  <section className="section-padding">
   <div className="container-premium">
    <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
     <div>
      <p className="heading-eyebrow mb-3">Yeni Gelenler</p>
      <h2 className="heading-display">Son gelen ürünler</h2>
     </div>
     <Link
      href="/yeni-gelenler"
      className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors"
     >
      Tüm yeni ürünler →
     </Link>
    </div>

    <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
     {products.map((product, index) => (
      <ProductCard
       key={product.id}
       product={product}
       priority={index < 2}
      />
     ))}
    </div>
   </div>
  </section>
 );
}
