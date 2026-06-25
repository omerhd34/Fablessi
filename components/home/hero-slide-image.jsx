import { getImageProps } from "next/image";
import { IMAGE_QUALITY_HERO } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const HERO_IMAGE_BREAKPOINTS = [
 { media: "(min-width: 96rem)", key: "2xl", width: 3840, height: 2560 },
 { media: "(min-width: 1440px)", key: "xl", width: 3200, height: 2133 },
 { media: "(min-width: 64rem)", key: "lg", width: 2560, height: 1707 },
 { media: "(min-width: 48rem)", key: "md", width: 1440, height: 2560 },
];

export function HeroSlideImage({ slide, priority, className }) {
 const { images, alt } = slide;
 const imageSizes = "100vw";
 const shared = {
  alt,
  sizes: imageSizes,
  priority,
  quality: IMAGE_QUALITY_HERO,
 };

 const sources = HERO_IMAGE_BREAKPOINTS.map(({ media, key, width, height }) => {
  const { props } = getImageProps({
   ...shared,
   src: images[key],
   width,
   height,
  });

  return <source key={key} media={media} srcSet={props.srcSet} />;
 });

 const { props: mobileImgProps } = getImageProps({
  ...shared,
  src: images.sm,
  width: 1080,
  height: 1920,
 });

 return (
  <picture className="absolute inset-0 block h-full w-full">
   {sources}
   <img
    {...mobileImgProps}
    alt={alt}
    className={cn("h-full w-full", className)}
    decoding={priority ? "sync" : "async"}
   />
  </picture>
 );
}
