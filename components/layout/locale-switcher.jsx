"use client";

import { useState } from "react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocaleFlagIcon } from "@/components/layout/locale-flag-icons";
import { localeLabels, locales } from "@/lib/i18n/config";
import { useLocale } from "@/contexts/locale-provider";
import { X } from "@/lib/icons";
import { cn } from "@/lib/utils";

function MobileLocaleSwitcher({ className }) {
 const { locale, setLocale, t } = useLocale();

 return (
  <div className={cn("locale-switcher locale-switcher--mobile", className)}>
   <p className="locale-switcher-mobile__label">{t("common.language")}</p>
   <div
    className="locale-switcher-mobile__options"
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
        "locale-switcher-mobile__option",
        active && "locale-switcher-mobile__option--active"
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
 const [open, setOpen] = useState(false);

 const handleSelect = (nextLocale) => {
  if (nextLocale !== locale) {
   setLocale(nextLocale);
  }
  setOpen(false);
 };

 return (
  <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
   <DropdownMenuTrigger asChild>
    <button
     type="button"
     className={cn("locale-switcher-btn", className)}
     aria-label={t("common.currentLanguage", {
      language: localeLabels[locale],
     })}
     aria-expanded={open}
    >
     <LocaleFlagIcon locale={locale} variant="trigger" />
    </button>
   </DropdownMenuTrigger>

   <DropdownMenuContent
    align="end"
    sideOffset={12}
    className="locale-switcher-menu"
    onCloseAutoFocus={(event) => event.preventDefault()}
   >
    <div className="locale-switcher-panel">
     <div className="locale-switcher-panel__header">
      <span className="locale-switcher-panel__title">
       {t("common.selectLanguage")}
      </span>
      <button
       type="button"
       className="locale-switcher-panel__close"
       onClick={() => setOpen(false)}
       aria-label={t("common.close")}
      >
       <X className="size-4" aria-hidden />
      </button>
     </div>

     <ul className="locale-switcher-panel__list">
      {locales.map((item) => (
       <li key={item}>
        <button
         type="button"
         className={cn(
          "locale-switcher-option",
          item === locale && "locale-switcher-option--active"
         )}
         onClick={() => handleSelect(item)}
         aria-current={item === locale ? "true" : undefined}
        >
         <LocaleFlagIcon locale={item} />
         <span>{localeLabels[item]}</span>
        </button>
       </li>
      ))}
     </ul>
    </div>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}

export function LocaleSwitcher({ variant = "header", className }) {
 if (variant === "mobile") {
  return <MobileLocaleSwitcher className={className} />;
 }

 return <HeaderLocaleSwitcher className={className} />;
}
