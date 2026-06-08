import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { brandName } from "@/lib/navigation";
import { getSiteWorkingHours, siteEmail, sitePhone, sitePhoneHref } from "@/lib/site-contact";

const MAP_COORDS = "40.0715022,29.5282003";
const MAP_URL =
 "https://www.google.com/maps/place/Mahmudiye,+11.+Mobilya+Sk.+No:21,+16400+%C4%B0neg%C3%B6l%2FBursa/@40.0715271,29.5274046,17.4z/data=!4m6!3m5!1s0x14cbc946a0354885:0x22a18df3a1dc7d5c!8m2!3d40.0715022!4d29.5282003!16s%2Fg%2F11csfd2lkh?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D";

export function getFlagshipStore(locale = defaultLocale) {
 const dictionary = getDictionary(locale);
 const mapLanguage = locale === "en" ? "en" : "tr";

 return {
  name: `${brandName.toUpperCase()}`,
  address: dictionary.contact.address,
  phone: sitePhone,
  phoneHref: sitePhoneHref,
  email: siteEmail,
  hours: getSiteWorkingHours(locale),
  mapUrl: MAP_URL,
  mapEmbedUrl: `https://www.google.com/maps?q=${MAP_COORDS}&hl=${mapLanguage}&z=16&output=embed&iwloc=0`,
 };
}

/** @deprecated use getFlagshipStore(locale) */
export const flagshipStore = getFlagshipStore(defaultLocale);
