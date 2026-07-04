import {
 HERO_IMAGE_BREAKPOINTS,
 HERO_LCP_PRELOAD_MEDIA,
 HERO_MOBILE_IMAGE,
} from "@/lib/content/hero-image-settings";

function buildPreloadLink({ href, media }) {
 return (
  <link
   rel="preload"
   as="image"
   href={href}
   media={media}
   fetchPriority="high"
  />
 );
}

export function HeroLcpPreloads({ images }) {
 const desktopBreakpoint =
  HERO_IMAGE_BREAKPOINTS.find(({ key }) => key === "xl") ??
  HERO_IMAGE_BREAKPOINTS[1];

 return (
  <>
   {buildPreloadLink({
    href: images[HERO_MOBILE_IMAGE.key],
    media: HERO_LCP_PRELOAD_MEDIA.mobile,
   })}
   {buildPreloadLink({
    href: images[desktopBreakpoint.key],
    media: HERO_LCP_PRELOAD_MEDIA.desktop,
   })}
  </>
 );
}
