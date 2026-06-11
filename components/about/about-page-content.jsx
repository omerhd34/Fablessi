"use client";

import Image from "next/image";
import { useTranslations } from "@/contexts/locale-provider";

export function AboutPageContent() {
 const { dictionary } = useTranslations();
 const { about } = dictionary;

 return (
  <>
   <section className="about-visual section-padding-sm" aria-hidden>
    <div className="container-premium">
     <div className="about-visual__image relative aspect-16/9 overflow-hidden rounded-2xl sm:aspect-21/9">
      <Image
       src="https://res.cloudinary.com/dbo6puh1c/image/upload/v1781205876/fablessi/velar-oturma/01.jpg"
       alt=""
       fill
       sizes="(max-width: 1280px) 100vw, 1200px"
       className="object-cover object-center"
      />
     </div>
    </div>
   </section>

   <section className="about-content pb-20 md:pb-28">
    <div className="container-premium">
     <div className="about-content__body mx-auto max-w-5xl">
      <p className="about-content__greeting font-display text-[clamp(1.15rem,2.8vw,1.45rem)] font-semibold leading-snug tracking-tight text-charcoal">
       {about.greeting}
      </p>

      <div className="mt-8 space-y-6">
       {about.paragraphs.map((paragraph) => (
        <p
         key={paragraph}
         className="font-body text-sm leading-[1.9] text-charcoal/78 md:text-[0.95rem]"
        >
         {paragraph}
        </p>
       ))}
      </div>

      <p className="about-content__closing mt-10 font-display text-[clamp(1rem,2.2vw,1.2rem)] font-medium tracking-tight text-charcoal">
       {about.closing}
      </p>
     </div>
    </div>
   </section>
  </>
 );

}
