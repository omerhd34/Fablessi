import { getImageProps } from "next/image";
import {
 HERO_IMAGE_BREAKPOINTS,
 HERO_LCP_PRELOAD_MEDIA,
 HERO_MOBILE_IMAGE,
} from "@/lib/content/hero-image-settings";

const HERO_IMAGE_QUALITY = 60;

const heroImageDimensions = Object.fromEntries(
 [...HERO_IMAGE_BREAKPOINTS, HERO_MOBILE_IMAGE].map(({ key, width, height }) => [
  key,
  { width, height },
 ])
);

function buildPreloadLink({ imageKey, src, media }) {
 const { width, height } = heroImageDimensions[imageKey];
 const { props } = getImageProps({
  src,
  alt: "",
  width,
  height,
  sizes: "100vw",
  quality: HERO_IMAGE_QUALITY,
  priority: true,
 });

 return (
  <link
   key={imageKey}
   rel="preload"
   as="image"
   href={props.src}
   imageSrcSet={props.srcSet}
   imageSizes={props.sizes}
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
     src: images[imageKey],
     media,
    })
   )}
  </>
 );
}
