import { HERO_LCP_PRELOAD_MEDIA } from "@/lib/content/hero-image-settings";

function buildPreloadLink({ imageKey, href, media }) {
 return (
  <link
   key={imageKey}
   rel="preload"
   as="image"
   href={href}
   media={media}
   fetchPriority="high"
  />
 );
}

export function HeroLcpPreloads({ images }) {
 return (
  <>
   {Object.entries(HERO_LCP_PRELOAD_MEDIA).map(([imageKey, media]) =>
    buildPreloadLink({
     imageKey,
     href: images[imageKey],
     media,
    })
   )}
  </>
 );
}
