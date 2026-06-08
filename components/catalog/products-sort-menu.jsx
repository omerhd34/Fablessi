"use client";

import { useMemo, useState } from "react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, CloseIcon } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";
import { getSortOptions } from "@/lib/i18n/catalog";
import { cn } from "@/lib/utils";

export function ProductsSortMenu({ sort, onSortChange, compact = false }) {
 const { t, dictionary } = useTranslations();
 const [open, setOpen] = useState(false);
 const sortOptions = useMemo(
  () => getSortOptions(dictionary),
  [dictionary]
 );
 const activeOption =
  sortOptions.find((option) => option.value === sort) ?? sortOptions[0];

 return (
  <div className="shrink-0 lg:self-auto">
   <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
     <button
      type="button"
      aria-label={t("catalog.sortOptions")}
      aria-expanded={open}
      className={cn(
       "flex h-11 min-w-0 cursor-pointer items-center justify-between gap-2 rounded-full border border-charcoal/12 bg-white py-0 pr-3 pl-3.5 text-sm font-medium text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] outline-none transition hover:border-charcoal/20 hover:shadow-[0_2px_8px_rgb(0_0_0/6%)] focus-visible:border-charcoal/25 focus-visible:ring-2 focus-visible:ring-charcoal/10 data-[state=open]:border-charcoal/20 data-[state=open]:shadow-[0_4px_16px_rgb(0_0_0/8%)] lg:h-14 lg:min-w-38 lg:gap-3 lg:pr-3.5 lg:pl-4"
      )}
     >
      <span>
       {compact ? t("catalog.sort") : activeOption.triggerLabel}
      </span>
      <ChevronDownIcon
       className={cn(
        "size-4 shrink-0 text-charcoal/65 transition-transform duration-200",
        open && "rotate-180"
       )}
       aria-hidden
      />
     </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
     align="end"
     sideOffset={8}
     className="w-[min(17.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-charcoal/8 bg-white p-0 text-charcoal shadow-[0_8px_32px_rgb(0_0_0/12%)] ring-0"
    >
     <div className="flex items-center justify-between px-5 py-4">
      <p className="text-base font-semibold text-charcoal">{t("catalog.sort")}</p>
      <button
       type="button"
       onClick={() => setOpen(false)}
       className="flex size-8 cursor-pointer items-center justify-center rounded-full text-charcoal/55 transition hover:bg-charcoal/6 hover:text-charcoal"
       aria-label={t("catalog.closeSort")}
      >
       <CloseIcon className="size-5 stroke-[1.75]" aria-hidden />
      </button>
     </div>

     <div className="border-t border-charcoal/8" />

     <div className="space-y-1 px-3 py-3">
      {sortOptions.map((option) => {
       const active = sort === option.value;

       return (
        <DropdownMenuItem
         key={option.value}
         onSelect={() => {
          onSortChange(option.value);
          setOpen(false);
         }}
         className={cn(
          "cursor-pointer rounded-xl px-3 py-3 text-left text-sm leading-snug text-charcoal/75 transition-colors focus:bg-charcoal/6 focus:text-charcoal",
          active && "bg-charcoal/6 font-semibold text-charcoal"
         )}
        >
         {option.label}
        </DropdownMenuItem>
       );
      })}
     </div>
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 );
}
