"use client";

import { LocaleFlagIcon } from "@/components/layout/locale-flag-icons";
import { localeLabels, locales } from "@/lib/i18n/config";
import { useLocale } from "@/contexts/locale-provider";
import { cn } from "@/lib/utils";

function getNextLocale(currentLocale) {
 return currentLocale === "tr" ? "en" : "tr";
}

function MobileLocaleSwitcher({ className }) {
 const { locale, setLocale, t } = useLocale();

 return (
  <div className={cn("w-full", className)}>
   <p className="locale-switcher-mobile__label mb-3 text-[0.6875rem] font-bold tracking-[0.12em] text-white/78 uppercase">
    {t("common.language")}
   </p>
   <div
    className="grid grid-cols-2 gap-2.5"
    role="listbox"
    aria-label={t("common.selectLanguage")}
   >
    {locales.map((item) => {
     const active = item === locale;

     return (
      <button
       key={item}
       type="button"
       role="option"
       aria-selected={active}
       className={cn(
        "locale-switcher-mobile__option inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--glass-hero-border)] bg-[var(--glass-hero-icon-surface)] px-3.5 py-2.5 text-sm font-medium text-white/92 transition-[border-color,background-color,color,box-shadow] duration-200 [backdrop-filter:var(--glass-hero-blur)] [-webkit-backdrop-filter:var(--glass-hero-blur)] hover:bg-white/20 [&_.locale-flag-icon]:size-[1.375rem]",
        active &&
         "locale-switcher-mobile__option--active border-[var(--glass-hero-border)] bg-white/22 font-semibold text-white shadow-none"
       )}
       onClick={() => setLocale(item)}
      >
       <LocaleFlagIcon locale={item} />
       <span>{localeLabels[item]}</span>
      </button>
     );
    })}
   </div>
  </div>
 );
}

function HeaderLocaleSwitcher({ className }) {
 const { locale, setLocale, t } = useLocale();
 const nextLocale = getNextLocale(locale);

 return (
  <button
   type="button"
   className={cn(
    "relative inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none transition-opacity duration-200 hover:opacity-82 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal/35 data-[state=open]:opacity-100 lg:size-11 xl:size-12",
    className
   )}
   aria-label={t("common.switchTo", {
    language: localeLabels[nextLocale],
   })}
   onClick={() => setLocale(nextLocale)}
  >
   <LocaleFlagIcon locale={locale} variant="trigger" />
  </button>
 );
}

export function LocaleSwitcher({ variant = "header", className }) {
 if (variant === "mobile") {
  return <MobileLocaleSwitcher className={className} />;
 }

 return <HeaderLocaleSwitcher className={className} />;
}
