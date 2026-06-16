/**
 * Responsive breakpoints — tek kaynak.
 * Tailwind: sm=640, md=768, lg=1024, xl=1440 (tailwind.config.js + @theme --breakpoint-xl)
 * Custom CSS variants (base.css): mobile-layout, tablet-header, desktop
 */

/** lg — 64rem / 1024px */
export const LG_MIN = "1024px";
export const LG_MQ = `(min-width: ${LG_MIN})`;

/** Mobil/tablet düzen üst sınırı — 90rem / 1440px */
export const MOBILE_LAYOUT_MAX = "1440px";
export const MAX_MOBILE_LAYOUT_MQ = `(max-width: ${MOBILE_LAYOUT_MAX})`;

/** Tablet header logo bandı: lg … mobile layout max */
export const TABLET_HEADER_MIN = LG_MIN;
export const TABLET_HEADER_MAX = MOBILE_LAYOUT_MAX;
export const TABLET_HEADER_MQ = `(min-width: ${TABLET_HEADER_MIN}) and (max-width: ${TABLET_HEADER_MAX})`;

/** Masaüstü düzen — 1441px+ (1440 dahil mobil/tablet) */
export const DESKTOP_LAYOUT_MIN = "1441px";
export const DESKTOP_LAYOUT_MQ = `(min-width: ${DESKTOP_LAYOUT_MIN})`;

/** Tailwind custom variant adları (base.css ile eşleşmeli) */
export const MOBILE_LAYOUT_VARIANT = "mobile-layout";
export const TABLET_HEADER_VARIANT = "tablet-header";
export const DESKTOP_VARIANT = "desktop";
