import { faqIntro } from "@/lib/faq";

export function FaqIntro() {
 return (
  <p className="mx-auto max-w-3xl text-center font-body text-sm leading-relaxed text-charcoal/80 md:text-[0.95rem]">
   {faqIntro}
  </p>
 );
}
