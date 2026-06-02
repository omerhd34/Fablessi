import Image from "next/image";
import Link from "next/link";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { getPrimaryImageUrl } from "@/lib/queries/home";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
 "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";

export function ProductCard({ product, className, priority = false }) {
 const imageUrl = getPrimaryImageUrl(product) ?? PLACEHOLDER;

 return (
  <Card
   className={cn(
    "glass-card group/card gap-0 overflow-hidden rounded-sm border-0 py-0 ring-0 transition-shadow hover:shadow-lg",
    className
   )}
  >
   <Link href={`/urunler/${product.slug}`} className="block">
    <div className="bg-muted relative aspect-4/5 overflow-hidden">
     <Image
      src={imageUrl}
      alt={product.images?.[0]?.alt ?? product.name}
      fill
      sizes="(max-width: 768px) 50vw, 25vw"
      className="object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
      priority={priority}
     />
    </div>
    <CardHeader className="gap-1 px-4 pt-4 pb-2">
     {product.collection?.name && (
      <CardDescription className="heading-eyebrow text-[0.6rem]">
       {product.collection.name}
      </CardDescription>
     )}
     <CardTitle className="text-base font-normal tracking-tight">
      {product.name}
     </CardTitle>
    </CardHeader>
    {product.dimensions && (
     <CardContent className="text-muted-foreground px-4 pb-4 text-xs">
      {product.dimensions}
     </CardContent>
    )}
   </Link>
  </Card>
 );
}
