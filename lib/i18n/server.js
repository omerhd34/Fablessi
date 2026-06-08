import { cookies } from "next/headers";
import { defaultLocale, isValidLocale, localeCookieName } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function getLocale() {
 const cookieStore = await cookies();
 const value = cookieStore.get(localeCookieName)?.value;
 return isValidLocale(value) ? value : defaultLocale;
}

export async function getServerDictionary() {
 const locale = await getLocale();
 return { locale, dictionary: getDictionary(locale) };
}
