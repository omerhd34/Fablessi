import tr from "@/lib/i18n/dictionaries/tr";
import en from "@/lib/i18n/dictionaries/en";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";

const dictionaries = { tr, en };

export function getDictionary(locale) {
 const resolved = isValidLocale(locale) ? locale : defaultLocale;
 return dictionaries[resolved];
}
