"use client";

import { useLocale } from "@/contexts/locale-provider";
import { brandName } from "@/lib/brand";
import { getCatalogSeoConfig, getPageSeoConfig } from "@/lib/seo/pages";
import { formatSeoTitle } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

const brandSuffix = ` - ${brandName}`;

function stripBrandSuffix(pageTitle) {
 const trimmed = pageTitle.trim();

 if (trimmed.endsWith(brandSuffix)) {
  return trimmed.slice(0, -brandSuffix.length);
 }

 return trimmed;
}

export function SeoH1({
 title,
 pageKey,
 categorySlug,
 className,
 children,
 ...props
}) {
 const { locale } = useLocale();
 const pageConfig = pageKey ? getPageSeoConfig(pageKey, locale) : null;
 const catalogConfig =
  !pageKey && categorySlug !== undefined
   ? getCatalogSeoConfig(categorySlug, locale)
   : null;
 const config = pageConfig ?? catalogConfig;
 const visible =
  typeof children === "string"
   ? children
   : stripBrandSuffix(title?.trim() ?? config?.pageTitle ?? "");
 const seoTitle =
  config?.metaTitle?.trim() ||
  title?.trim() ||
  (visible ? formatSeoTitle(visible) : "");

 return (
  <>
   <h1 className="sr-only">{seoTitle}</h1>
   <p className={cn(className)} aria-hidden="true" {...props}>
    {visible}
   </p>
  </>
 );
}
