import Image from "next/image";

export function PageHeroPicture({ src, alt = "" }) {
 return (
  <Image
   src={src}
   alt={alt}
   fill
   priority
   sizes="100vw"
   className="object-cover object-center"
  />
 );
}
