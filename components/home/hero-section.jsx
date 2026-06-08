"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HERO_AUTOPLAY_MS = 15_000;

const heroNavButtonClass = "hero-nav-btn";

const HERO_SLIDES = [
 {
  image: "/acelya-oturma/antrasit-01.jpg",
  alt: "Açelya Oturma Grubu — Fablessi bahçe mobilyası",
  headline: "Yaz Fablessi ile başlar.",
  lines: [
   "Bahçeniz ve açık alanlarınız yaza hazır mı?",
   "Açelya koleksiyonumuz şimdi Fablessi'de.",
  ],
  cta: { label: "Açelya Oturma Grubu", href: "/urunler/acelya-oturma" },
 },
 {
  image: "/aston-oturma/antrasit-01.jpg",
  alt: "Aston Oturma Grubu — modern dış mekan oturma",
  headline: "Modern çizgiler, açık hava konforu.",
  lines: [
   "Aston serisi villa ve teras projeleri için tasarlandı.",
   "Antrasit ve Cappuccino renk seçenekleriyle.",
  ],
  cta: { label: "Aston Oturma Grubu", href: "/urunler/aston-oturma" },
 },
 {
  image: "/tesla-kose/antrasit-01.jpg",
  alt: "Tesla Köşe Grubu — modüler bahçe köşe takımı",
  headline: "Köşeleriniz için modüler çözüm.",
  lines: [
   "L form oturma düzeni ile geniş teraslar.",
   "Tesla köşe grubu havuz ve bahçe alanlarına uygun.",
  ],
  cta: { label: "Tesla Köşe Grubu", href: "/urunler/tesla-kose" },
 },
 {
  image: "/tesla-oturma/01.jpg",
  alt: "Tesla Oturma Grubu — dış mekan oturma koleksiyonu",
  headline: "Tesla ile bahçe yaşamı.",
  lines: [
   "Dayanıklı malzeme, konforlu oturum deneyimi.",
   "Tesla oturma grubu aile buluşmaları için ideal.",
  ],
  cta: { label: "Tesla Oturma Grubu", href: "/urunler/tesla-oturma" },
 },
 {
  image: "/tesla-masa/01.jpg",
  alt: "Tesla Masa Grubu — dış mekan yemek takımı",
  headline: "Açık havada sofralar kurun.",
  lines: [
   "Tesla masa grubu ile terasta yemek keyfi.",
   "Alüminyum ve cam detaylarla şık görünüm.",
  ],
  cta: { label: "Tesla Masa Grubu", href: "/urunler/tesla-masa" },
 },
 {
  image: "/tesla-salincak/01.jpeg",
  alt: "Tesla Salıncak — bahçe salıncağı",
  headline: "Dinlenmenin yeni adresi.",
  lines: [
   "Bahçe ve terasta huzurlu anlar.",
   "Tesla salıncak dayanıklı örgü ve alüminyum gövde.",
  ],
  cta: { label: "Tesla Salıncak", href: "/urunler/tesla-salincak" },
 },
 {
  image: "/velar-oturma/01.jpg",
  alt: "Velar Oturma Grubu — premium bahçe mobilyası",
  headline: "Sessiz lüks, açık havada.",
  lines: [
   "İnegöl'ün ustalığıyla şekillenen zamansız formlar.",
   "Velar serisi ile teras ve bahçenize zarafet katın.",
  ],
  cta: { label: "Velar Oturma Grubu", href: "/urunler/velar-oturma" },
 },
 {
  image: "/velar-kose/cappuccino-01.jpg",
  alt: "Velar Köşe Grubu — premium köşe oturma",
  headline: "Geniş oturum, premium detay.",
  lines: [
   "Velar köşe grubu modüler yapısıyla esnek düzenler.",
   "Cappuccino tonlarında şık dış mekan görünümü.",
  ],
  cta: { label: "Velar Köşe Grubu", href: "/urunler/velar-kose" },
 },
 {
  image: "/velar-masa/01.jpg",
  alt: "Velar Masa Grubu — teras yemek takımı",
  headline: "Terasınıza sofistike dokunuş.",
  lines: [
   "Velar masa grubu bahçe yemek alanları için.",
   "Dayanıklı malzeme, zamansız tasarım çizgileri.",
  ],
  cta: { label: "Velar Masa Grubu", href: "/urunler/velar-masa" },
 },
 {
  image: "/velar-salincak/01.jpeg",
  alt: "Velar Salıncak — premium bahçe salıncağı",
  headline: "Havuz kenarında keyif.",
  lines: [
   "Velar salıncak teras dinlenme köşeleri için.",
   "Premium bahçe mobilyası serisinin vazgeçilmezi.",
  ],
  cta: { label: "Velar Salıncak", href: "/urunler/velar-salincak" },
 },
 {
  image: "/velar-sezlong/01.jpg",
  alt: "Velar Şezlong — havuz ve teras şezlongu",
  headline: "Güneşin tadını çıkarın.",
  lines: [
   "Ayarlanabilir sırtlı Velar şezlong.",
   "Havuz ve güneş terası kullanımına uygun.",
  ],
  cta: { label: "Velar Şezlong", href: "/urunler/velar-sezlong" },
 },
 {
  image: "/trend-sandalye/01.jpg",
  alt: "Trend Sallanır Sandalye — bahçe sandalyesi",
  headline: "Hareket ve konfor bir arada.",
  lines: [
   "Trend sallanır sandalye balkon ve bahçe için.",
   "Rahat oturum, zarif salınım hareketi.",
  ],
  cta: { label: "Trend Sallanır Sandalye", href: "/urunler/trend-sandalye" },
 },
];

export function HeroSection() {
 const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
 const [selectedIndex, setSelectedIndex] = useState(0);
 const autoplayTimerRef = useRef(null);

 const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
 const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

 const clearAutoplayTimer = useCallback(() => {
  if (autoplayTimerRef.current !== null) {
   window.clearTimeout(autoplayTimerRef.current);
   autoplayTimerRef.current = null;
  }
 }, []);

 const scheduleAutoplay = useCallback(() => {
  if (!emblaApi) return;

  clearAutoplayTimer();
  autoplayTimerRef.current = window.setTimeout(() => {
   emblaApi.scrollNext();
  }, HERO_AUTOPLAY_MS);
 }, [clearAutoplayTimer, emblaApi]);

 useEffect(() => {
  if (!emblaApi) return;

  const onSelect = () => {
   setSelectedIndex(emblaApi.selectedScrollSnap());
   scheduleAutoplay();
  };

  onSelect();
  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", onSelect);

  return () => {
   emblaApi.off("select", onSelect);
   emblaApi.off("reInit", onSelect);
   clearAutoplayTimer();
  };
 }, [clearAutoplayTimer, emblaApi, scheduleAutoplay]);

 return (
  <section className="relative w-full">
   <div className="overflow-hidden" ref={emblaRef}>
    <div className="flex">
     {HERO_SLIDES.map((slide, index) => (
      <div key={slide.cta.href} className="relative min-w-0 flex-[0_0_100%]">
       <div className="relative min-h-svh w-full">
        <Image
         src={slide.image}
         alt={slide.alt}
         fill
         priority={index === 0}
         sizes="100vw"
         className={cn("object-cover", slide.imagePosition ?? "object-center")}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30" />

        <div className="absolute inset-x-0 top-[38%] flex -translate-y-1/2 flex-col items-center px-4 sm:px-6">
         <div className="hero-slide-copy">
          <div className="hero-slide-copy__panel">
           <h1 className="hero-slide-copy__headline">{slide.headline}</h1>
           <div className="hero-slide-copy__lines">
            {slide.lines.map((line) => (
             <p key={line} className="hero-slide-copy__line">
              {line}
             </p>
            ))}
           </div>
          </div>
          <Link
           href={slide.cta.href}
           className="hero-slide-copy__cta"
          >
           {slide.cta.label}
          </Link>
         </div>
        </div>
       </div>
      </div>
     ))}
    </div>
   </div>

   <button
    type="button"
    onClick={scrollPrev}
    className={cn(heroNavButtonClass, "hero-nav-btn--prev")}
    aria-label="Önceki slayt"
   >
    <HeroChevronLeft className="hero-nav-btn__icon" aria-hidden />
   </button>
   <button
    type="button"
    onClick={scrollNext}
    className={cn(heroNavButtonClass, "hero-nav-btn--next")}
    aria-label="Sonraki slayt"
   >
    <HeroChevronRight className="hero-nav-btn__icon" aria-hidden />
   </button>

   <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
    {HERO_SLIDES.map((slide, index) => (
     <button
      key={slide.cta.href}
      type="button"
      onClick={() => emblaApi?.scrollTo(index)}
      className={cn(
       "h-0.5 cursor-pointer rounded-full transition-all duration-300",
       selectedIndex === index
        ? "w-8 bg-white"
        : "w-5 bg-white/45 hover:bg-white/70"
      )}
      aria-label={`Slayt ${index + 1}`}
     />
    ))}
   </div>
  </section>
 );
}
