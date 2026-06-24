import { ProductForm } from "@/components/admin/product-form";
import { getCategoryGroupOptions } from "@/lib/admin/queries";
import { getFeaturedProductCount } from "@/lib/admin/featured-products";

export default async function NewProductPage() {
 const [categoryGroups, featuredCount] = await Promise.all([
  getCategoryGroupOptions(),
  getFeaturedProductCount(),
 ]);

 return (
  <div className="space-y-6">
   <div>
    <h1 className="text-2xl font-semibold tracking-tight">Yeni Ürün</h1>
    <p className="mt-1 text-sm text-muted-foreground">
     Ürün adını tam yazın (ör. Açelya antrasit oturma grubu) ve kategori seçin.
    </p>
   </div>
   <ProductForm
    categoryGroups={categoryGroups}
    featuredCount={featuredCount}
   />
  </div>
 );
}
