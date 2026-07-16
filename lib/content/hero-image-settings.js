export const HERO_IMAGE_SIZES = "100vw";

export const HERO_IMAGE_BREAKPOINTS = [
 { media: "(min-width: 96rem)", key: "2xl", width: 2560, height: 1707 },
 { media: "(min-width: 1440px)", key: "xl", width: 1920, height: 1280 },
 { media: "(min-width: 64rem)", key: "lg", width: 1600, height: 1067 },
 { media: "(min-width: 48rem)", key: "md", width: 1440, height: 2560 },
];

export const HERO_MOBILE_IMAGE = { key: "sm", width: 1080, height: 1920 };

export const HERO_LCP_PRELOAD_MEDIA = {
 sm: "(max-width: 47.99rem)",
 md: "(min-width: 48rem) and (max-width: 63.99rem)",
 lg: "(min-width: 64rem) and (max-width: 1439px)",
 xl: "(min-width: 1440px) and (max-width: 95.99rem)",
 "2xl": "(min-width: 96rem)",
};
