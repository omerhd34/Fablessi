export const heroSlidesData = [
 { slug: "acelya-oturma", image: "/acelya-oturma/antrasit-01.jpg", href: "/urunler/acelya-oturma" },
 { slug: "aston-oturma", image: "/aston-oturma/antrasit-01.jpg", href: "/urunler/aston-oturma" },
 { slug: "tesla-kose", image: "/tesla-kose/antrasit-01.jpg", href: "/urunler/tesla-kose" },
 { slug: "tesla-oturma", image: "/tesla-oturma/01.jpg", href: "/urunler/tesla-oturma" },
 { slug: "tesla-masa", image: "/tesla-masa/01.jpg", href: "/urunler/tesla-masa" },
 { slug: "tesla-salincak", image: "/tesla-salincak/01.jpeg", href: "/urunler/tesla-salincak" },
 { slug: "velar-oturma", image: "/velar-oturma/01.jpg", href: "/urunler/velar-oturma" },
 { slug: "velar-kose", image: "/velar-kose/cappuccino-01.jpg", href: "/urunler/velar-kose" },
 { slug: "velar-masa", image: "/velar-masa/01.jpg", href: "/urunler/velar-masa" },
 { slug: "velar-salincak", image: "/velar-salincak/01.jpeg", href: "/urunler/velar-salincak" },
 { slug: "velar-sezlong", image: "/velar-sezlong/01.jpg", href: "/urunler/velar-sezlong" },
 { slug: "trend-sandalye", image: "/trend-sandalye/01.jpg", href: "/urunler/trend-sandalye" },
];

export function buildHeroSlides(dictionary) {
 return heroSlidesData.map((slide) => {
  const content = dictionary.hero.slides[slide.slug];

  return {
   image: slide.image,
   alt: content.alt,
   headline: content.headline,
   lines: content.lines,
   cta: { label: content.cta, href: slide.href },
  };
 });
}
