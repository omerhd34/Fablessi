"use client";

import { ChevronRight } from "lucide-react";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function FaqAccordionList({ items, idPrefix }) {
 return (
  <Accordion type="single" collapsible className="w-full">
   {items.map((item, index) => (
    <AccordionItem
     key={`${idPrefix}-${index}`}
     value={`${idPrefix}-${index}`}
     className="border-charcoal/12 border-t border-b-0 last:border-b"
    >
     <AccordionTrigger
      className={cn(
       "group/faq-trigger cursor-pointer gap-4 py-5 font-body text-[0.9rem] font-normal text-charcoal/90 hover:no-underline md:text-[0.95rem]",
       "**:data-[slot=accordion-trigger-icon]:hidden"
      )}
     >
      <ChevronRight
       className="size-3.5 shrink-0 text-charcoal/35 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-90"
       aria-hidden
      />
      <span className="flex-1 text-left">{item.question}</span>
     </AccordionTrigger>
     <AccordionContent className="font-body text-sm leading-relaxed text-charcoal/70 md:text-[0.9rem]">
      <div className="pb-5 pl-7">{item.answer}</div>
     </AccordionContent>
    </AccordionItem>
   ))}
  </Accordion>
 );
}
