import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
 "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=85";

export function HeroSection() {
 return (
  <section className="w-full">
   <div className="relative min-h-svh w-full">
    <Image
     src={HERO_IMAGE}
     alt="Maison & Objet — premium mobilya sergisi"
     fill
     priority
     sizes="100vw"
     className="object-cover object-center"
    />
   </div>

   <div className="border-b border-border/60 bg-background py-10 text-center md:py-14">
    <p className="heading-eyebrow mb-3">Sergi &amp; Koleksiyon</p>
    <h1 className="heading-display text-charcoal mx-auto max-w-4xl px-6">
     Maison &amp; Objet Paris 2026
    </h1>
    <p className="text-muted-foreground mx-auto mt-5 max-w-xl px-6 text-sm leading-relaxed md:text-base">
     Zamansız formlar, seçkin malzemeler ve özenle küratörlüğü yapılmış
     koleksiyonlar.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-3 px-6">
     <Link
      href="/koleksiyonlar"
      className="bg-charcoal hover:bg-charcoal/90 inline-flex h-10 items-center justify-center rounded-sm px-6 text-[0.7rem] tracking-[0.16em] text-white uppercase transition-colors"
     >
      Koleksiyonları Keşfet
     </Link>
     <Link
      href="/projeler"
      className="border-charcoal/30 text-charcoal hover:bg-muted inline-flex h-10 items-center justify-center rounded-sm border bg-transparent px-6 text-[0.7rem] tracking-[0.16em] uppercase transition-colors"
     >
      Projeleri İncele
     </Link>
    </div>
   </div>
  </section>
 );
}
