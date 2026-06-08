export const locales = ["tr", "en"];
export const defaultLocale = "tr";
export const localeCookieName = "fablessi_locale";

export const localeLabels = {
 tr: "Türkçe",
 en: "English",
};

export const localeShortLabels = {
 tr: "TR",
 en: "EN",
};

export function isValidLocale(value) {
 return locales.includes(value);
}
