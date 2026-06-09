"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { brandSlug } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 1168;
const LOGO_HEIGHT = 268;
const LOGO_ALPHA_THRESHOLD = 80;

const logoHeights = {
 xs: "2rem",
 sm: "2.25rem",
 md: "2.5rem",
 lg: "2.75rem",
 xl: "3rem",
};

function buildLogoHitMap(imageData, threshold) {
 const { width, height, data } = imageData;
 const pixelCount = width * height;
 const isOpaque = (index) => data[index * 4 + 3] >= threshold;
 const exterior = new Uint8Array(pixelCount);
 const queue = new Int32Array(pixelCount);
 let queueStart = 0;
 let queueEnd = 0;

 const enqueueIfExterior = (x, y) => {
  const index = y * width + x;
  if (exterior[index] || isOpaque(index)) return;
  exterior[index] = 1;
  queue[queueEnd++] = index;
 };

 for (let x = 0; x < width; x++) {
  enqueueIfExterior(x, 0);
  enqueueIfExterior(x, height - 1);
 }

 for (let y = 0; y < height; y++) {
  enqueueIfExterior(0, y);
  enqueueIfExterior(width - 1, y);
 }

 while (queueStart < queueEnd) {
  const index = queue[queueStart++];
  const x = index % width;
  const y = (index - x) / width;

  if (x > 0) enqueueIfExterior(x - 1, y);
  if (x < width - 1) enqueueIfExterior(x + 1, y);
  if (y > 0) enqueueIfExterior(x, y - 1);
  if (y < height - 1) enqueueIfExterior(x, y + 1);
 }

 const hitMap = new Uint8Array(pixelCount);
 for (let index = 0; index < pixelCount; index++) {
  hitMap[index] = isOpaque(index) || !exterior[index] ? 1 : 0;
 }

 return { width, height, hitMap };
}

function useLogoAlphaHitTest(imageRef) {
 const hitMapRef = useRef(null);

 useEffect(() => {
  const img = imageRef.current;
  if (!img) return;

  const buildHitMap = () => {
   if (!img.naturalWidth || !img.naturalHeight) return;

   const canvas = document.createElement("canvas");
   canvas.width = img.naturalWidth;
   canvas.height = img.naturalHeight;

   const context = canvas.getContext("2d");
   if (!context) return;

   context.drawImage(img, 0, 0);
   const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
   hitMapRef.current = buildLogoHitMap(imageData, LOGO_ALPHA_THRESHOLD);
  };

  if (img.complete) {
   buildHitMap();
  }

  img.addEventListener("load", buildHitMap);
  return () => img.removeEventListener("load", buildHitMap);
 }, [imageRef]);

 return useCallback((event) => {
  const img = imageRef.current;
  const hitMap = hitMapRef.current;
  if (!img || !hitMap) return false;

  const rect = img.getBoundingClientRect();
  const localX = event.clientX - rect.left;
  const localY = event.clientY - rect.top;

  if (
   localX < 0 ||
   localY < 0 ||
   localX > rect.width ||
   localY > rect.height
  ) {
   return false;
  }

  const x = Math.min(
   hitMap.width - 1,
   Math.floor((localX / rect.width) * hitMap.width)
  );
  const y = Math.min(
   hitMap.height - 1,
   Math.floor((localY / rect.height) * hitMap.height)
  );

  return hitMap.hitMap[y * hitMap.width + x] === 1;
 }, [imageRef]);
}

export function BrandLogoLink({ href = "/", size = "md", className }) {
 const { t } = useTranslations();
 const imageRef = useRef(null);
 const isLogoHit = useLogoAlphaHitTest(imageRef);
 const [isLogoActive, setIsLogoActive] = useState(false);
 const logoHeight = logoHeights[size] ?? logoHeights.md;

 const syncPointerState = useCallback(
  (event) => {
   const img = imageRef.current;
   if (!img) return;

   const hit = isLogoHit(event);
   img.style.cursor = hit ? "pointer" : "default";
   setIsLogoActive(hit);
  },
  [isLogoHit]
 );

 const resetPointerState = useCallback(() => {
  const img = imageRef.current;
  if (!img) return;
  img.style.cursor = "default";
  setIsLogoActive(false);
 }, []);

 const blockNonLogoNavigation = useCallback(
  (event) => {
   if (!isLogoHit(event)) {
    event.preventDefault();
    event.stopPropagation();
   }
  },
  [isLogoHit]
 );

 return (
  <Link
   href={href}
   className={cn("brand-logo-link", className)}
   aria-label={`${brandSlug} — ${t("common.home")}`}
   onPointerDown={blockNonLogoNavigation}
   onClick={blockNonLogoNavigation}
  >
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img
    ref={imageRef}
    src="/brand/logo.png"
    alt={`${brandSlug} logo`}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    decoding="async"
    fetchPriority="high"
    draggable={false}
    onMouseMove={syncPointerState}
    onMouseLeave={resetPointerState}
    style={{
     height: logoHeight,
     width: "auto",
     maxWidth: "none",
    }}
    className={cn(
     "brand-logo-image brand-logo",
     isLogoActive && "brand-logo-image--active"
    )}
   />
  </Link>
 );
}
