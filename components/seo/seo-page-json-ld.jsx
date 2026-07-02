import { getPageSeoConfig, pageSeoPaths } from "@/lib/seo/pages";
import { buildPageWebPageJsonLd } from "@/lib/seo/json-ld";
import { getLocale } from "@/lib/i18n/server";

export async function SeoPageJsonLd({ pageKey }) {
 const locale = await getLocale();
 const path = pageSeoPaths[pageKey];
 const config = getPageSeoConfig(pageKey, locale);

 if (!path || !config) return null;

 const jsonLd = buildPageWebPageJsonLd({ pageKey, path, locale });

 return (
  <script
   type="application/ld+json"
   dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
 );
}
