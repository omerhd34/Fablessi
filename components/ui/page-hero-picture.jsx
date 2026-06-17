import Image from "next/image";
import { PAGE_HERO_IMAGE_KEYS } from "@/lib/content/page-hero-images";
import {
 HERO_SM2X_MQ,
 HERO_XL2X_MQ,
 HERO_XL_MQ,
 LG_MQ,
 MD_MQ,
} from "@/lib/layout/breakpoints";

function allHeroSourcesEqual(images) {
 const values = PAGE_HERO_IMAGE_KEYS.map((key) => images[key]).filter(Boolean);
 if (values.length === 0) return true;

 return values.every((value) => value === values[0]);
}

export function PageHeroPicture({ src, images, alt = "" }) {
 const resolved = images ?? (src ? { sm: src } : null);
 if (!resolved?.sm) return null;

 if (!images || allHeroSourcesEqual(resolved)) {
  const singleSrc = src ?? resolved.sm;

  return (
   <Image
    src={singleSrc}
    alt={alt}
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
   />
  );
 }

 return (
  <picture className="absolute inset-0 block h-full w-full">
   <source media={HERO_XL2X_MQ} srcSet={resolved.xl2x} />
   <source media={HERO_XL_MQ} srcSet={resolved.xl} />
   <source media={LG_MQ} srcSet={resolved.lg} />
   <source media={MD_MQ} srcSet={resolved.md} />
   <source media={HERO_SM2X_MQ} srcSet={resolved.sm2x} />
   <Image
    src={resolved.sm}
    alt={alt}
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
   />
  </picture>
 );
}
