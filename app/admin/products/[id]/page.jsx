import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";
import { getAdminProduct, getCategoryGroupOptions } from "@/lib/admin/queries";
import { getFeaturedProductCount } from "@/lib/admin/featured-products";
import { Button } from "@/components/ui/button";
import { LuArrowRight, LuArrowUpLeft } from "react-icons/lu";

export default async function EditProductPage({ params }) {
 const { id } = await params;
 const [product, categoryGroups, featuredCount] = await Promise.all([
  getAdminProduct(id),
  getCategoryGroupOptions(),
  getFeaturedProductCount(),
 ]);

 if (!product) notFound();

 return (
  <div className="space-y-6">
   <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
     <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
    </div>
    <div className="flex gap-2">
     <Button variant="outline" className="gap-2" asChild>
      <Link href={`/urunler/${product.slug}`} target="_blank">
       <LuArrowUpLeft className="size-4" />
       Sitede gör
      </Link>
     </Button>
     <Button variant="outline" className="gap-2" asChild>
      <Link href="/admin/products">
       Listeye dön
       <LuArrowRight className="size-4" />
      </Link>
     </Button>
    </div>
   </div>
   <ProductForm
    product={product}
    categoryGroups={categoryGroups}
    featuredCount={featuredCount}
   />
  </div>
 );
}
