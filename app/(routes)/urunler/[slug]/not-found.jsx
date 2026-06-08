import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/server";

export default async function UrunNotFound() {
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const { product: productCopy } = dictionary;

 return (
  <div className="page-content-offset container-premium pb-20 text-center">
   <h1 className="heading-display text-charcoal">{productCopy.notFound}</h1>
   <p className="text-muted-foreground mt-3 text-sm">
    {productCopy.notFoundDescription}
   </p>
   <Link
    href="/urunler"
    className="mt-8 inline-flex rounded-full border border-charcoal/12 bg-white px-5 py-2.5 text-sm font-medium text-charcoal transition hover:border-charcoal/25"
   >
    {productCopy.backToAllProducts}
   </Link>
  </div>
 );
}
