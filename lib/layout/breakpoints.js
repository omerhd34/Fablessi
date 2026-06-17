/**
 * Responsive breakpoints — tek kaynak.
 * Tailwind: sm=640, md=768, lg=1024, xl=1440 (tailwind.config.js + @theme --breakpoint-xl)
 * Custom CSS variants (base.css): mobile-layout, tablet-header, desktop
 */

/** md — 48rem / 768px (px kullanın; rem tarayıcı yazı boyutundan etkilenir) */
export const MD_MIN = "768px";
export const MD_MQ = `(min-width: ${MD_MIN})`;

/** lg — 64rem / 1024px */
export const LG_MIN = "1024px";
export const LG_MQ = `(min-width: ${LG_MIN})`;

/** Hero xl — 96rem / 1536px */
export const HERO_XL_MIN = "1536px";
export const HERO_XL_MQ = `(min-width: ${HERO_XL_MIN})`;

/** Mobil hero üst sınırı (sm / sm2x) */
export const HERO_SM_MAX = "767.98px";
export const HERO_SM2X_MQ = `(max-width: ${HERO_SM_MAX}) and (min-resolution: 2dppx)`;
export const HERO_XL2X_MQ = `(min-width: ${HERO_XL_MIN}) and (min-resolution: 2dppx)`;

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
