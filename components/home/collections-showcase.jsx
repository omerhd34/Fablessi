import Image from "next/image";
import Link from "next/link";
import {
 Card,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { getPrimaryImageUrl } from "@/lib/queries/home";

const FALLBACK_COVER =
 "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80";

export function CollectionsShowcase({ collections }) {
 if (!collections.length) {
  return null;
 }

 return (
  <section className="section-padding bg-cream/50">
   <div className="container-premium">
    <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
     <div>
      <p className="heading-eyebrow mb-3">Koleksiyonlar</p>
      <h2 className="heading-display">Koleksiyon vitrini</h2>
     </div>
     <Link
      href="/koleksiyonlar"
      className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors"
     >
      Tümünü gör →
     </Link>
    </div>

    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
     {collections.map((collection) => {
      const cover =
       collection.coverImage ??
       getPrimaryImageUrl(collection.products[0] ?? {}) ??
       FALLBACK_COVER;

      return (
       <Link
        key={collection.id}
        href={`/koleksiyonlar/${collection.slug}`}
        className="group block"
       >
        <Card className="glass-card gap-0 overflow-hidden rounded-sm border-0 py-0 ring-0">
         <div className="relative aspect-3/4 overflow-hidden">
          <Image
           src={cover}
           alt={collection.name}
           fill
           sizes="(max-width: 768px) 100vw, 33vw"
           className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="from-charcoal/60 absolute inset-0 bg-linear-to-to-transparent" />
          <CardHeader className="absolute right-0 bottom-0 left-0 gap-1 border-0 text-white">
           <CardDescription className="text-[0.6rem] tracking-[0.28em] text-white/70 uppercase">
            {collection._count.products} ürün
           </CardDescription>
           <CardTitle className="text-xl font-light tracking-tight md:text-2xl">
            {collection.name}
           </CardTitle>
          </CardHeader>
         </div>
        </Card>
       </Link>
      );
     })}
    </div>
   </div>
  </section>
 );
}
