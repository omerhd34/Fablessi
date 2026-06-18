"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductDetailCenter } from "@/components/product/product-detail-center";
import { ProductDetailLeft } from "@/components/product/product-detail-left";
import { ProductDetailRight } from "@/components/product/product-detail-right";
import { ProductImageLightbox } from "@/components/product/product-image-lightbox";
import { LG_MQ } from "@/lib/layout/breakpoints";
import { productDetailScrollClass } from "@/lib/layout/product-styles";
import {
 filterImagesByColorPrefix,
 getDefaultColorPrefix,
 getProductColorVariants,
} from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductDetailView({
 product,
 categoryLabel,
 categoryHref,
 categoryProducts = [],
 collectionLabel,
 collectionProducts = [],
}) {
 const [lightbox, setLightbox] = useState({ images: [], index: null });
 const [openDimensions, setOpenDimensions] = useState(false);
 const [openProductInfo, setOpenProductInfo] = useState(false);
 const centerScrollRef = useRef(null);
 const allImages = product.images ?? [];
 const colorVariants = useMemo(
  () => getProductColorVariants(allImages, product.slug),
  [allImages, product.slug]
 );
 const defaultColorPrefix = useMemo(
  () => getDefaultColorPrefix(allImages, colorVariants),
  [allImages, colorVariants]
 );
 const [selectedColorPrefix, setSelectedColorPrefix] = useState(defaultColorPrefix);

 useEffect(() => {
  setSelectedColorPrefix(defaultColorPrefix);
 }, [product.slug, defaultColorPrefix]);

 const visibleImages = useMemo(() => {
  if (!colorVariants || !selectedColorPrefix) return allImages;

  return filterImagesByColorPrefix(allImages, selectedColorPrefix, product.slug);
 }, [allImages, colorVariants, selectedColorPrefix, product.slug]);

 const handleColorSelect = useCallback((prefix) => {
  setSelectedColorPrefix(prefix);
  setLightbox({ images: [], index: null });
 }, []);

 const openLightbox = (images, index) => {
  if (!images.length) return;
  setLightbox({ images, index });
 };

 const closeLightbox = () => setLightbox({ images: [], index: null });

 const handleViewDimensions = useCallback(() => {
  const isContainedScroll = window.matchMedia(LG_MQ).matches;

  setOpenDimensions(true);

  window.setTimeout(() => {
   const container = centerScrollRef.current;
   const target = container?.querySelector("[data-product-dimensions]");

   if (!target) return;

   if (isContainedScroll && container) {
    const offset =
     target.getBoundingClientRect().top -
     container.getBoundingClientRect().top +
     container.scrollTop;

    container.scrollTo({
     top: Math.max(0, offset - 24),
     behavior: "smooth",
    });
   } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
   }
  }, 350);
 }, []);

 const handleViewProductInfo = useCallback(() => {
  const isContainedScroll = window.matchMedia(LG_MQ).matches;

  setOpenProductInfo(true);

  window.setTimeout(() => {
   const container = centerScrollRef.current;
   const target = container?.querySelector("[data-product-info]");

   if (!target) return;

   if (isContainedScroll && container) {
    const offset =
     target.getBoundingClientRect().top -
     container.getBoundingClientRect().top +
     container.scrollTop;

    container.scrollTo({
     top: Math.max(0, offset - 24),
     behavior: "smooth",
    });
   } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
   }
  }, 350);
 }, []);

 const hasCategoryPanel = categoryLabel && categoryProducts.length > 0;
 const hasCollectionPanel = collectionLabel && collectionProducts.length > 0;
 const hasRightPanel = hasCategoryPanel || hasCollectionPanel;

 return (
  <>
   <div
    className={cn(
     "flex flex-col gap-4 lg:grid lg:items-start lg:gap-8",
     hasRightPanel
      ? "lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,19rem)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,21rem)] xl:gap-10"
      : "lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]"
    )}
   >
    <ProductDetailLeft
     product={product}
     categoryLabel={categoryLabel}
     categoryHref={categoryHref}
     onViewDimensions={handleViewDimensions}
     onViewProductInfo={handleViewProductInfo}
     colorVariants={colorVariants}
     selectedColorPrefix={selectedColorPrefix}
     onColorSelect={handleColorSelect}
     section="header"
     className="lg:hidden"
    />
    <ProductDetailLeft
     product={product}
     categoryLabel={categoryLabel}
     categoryHref={categoryHref}
     onViewDimensions={handleViewDimensions}
     onViewProductInfo={handleViewProductInfo}
     colorVariants={colorVariants}
     selectedColorPrefix={selectedColorPrefix}
     onColorSelect={handleColorSelect}
     className="hidden min-w-0 lg:flex lg:shrink-0"
    />

    <section
     ref={centerScrollRef}
     className={cn(
      "min-h-0 lg:max-h-[calc(100dvh-var(--header-height-desktop)-2rem)] lg:overflow-y-auto lg:pr-2 lg:pb-6",
      productDetailScrollClass
     )}
    >
     <ProductDetailCenter
      product={product}
      images={visibleImages}
      onImageClick={(index) => openLightbox(visibleImages, index)}
      openDimensions={openDimensions}
      openProductInfo={openProductInfo}
      className="pb-0 lg:pb-6"
      belowGallery={
       <ProductDetailLeft
        product={product}
        categoryLabel={categoryLabel}
        categoryHref={categoryHref}
        onViewDimensions={handleViewDimensions}
        onViewProductInfo={handleViewProductInfo}
        colorVariants={colorVariants}
        selectedColorPrefix={selectedColorPrefix}
        onColorSelect={handleColorSelect}
        section="controls"
        className="lg:hidden"
       />
      }
     />
    </section>

    {hasRightPanel ? (
     <ProductDetailRight
      product={product}
      categoryLabel={categoryLabel}
      categoryProducts={categoryProducts}
      collectionLabel={collectionLabel}
      collectionProducts={collectionProducts}
      className="lg:self-start"
     />
    ) : null}
   </div>

   <ProductImageLightbox
    images={lightbox.images}
    index={lightbox.index}
    onIndexChange={(index) =>
     setLightbox((current) => ({ ...current, index }))
    }
    onClose={closeLightbox}
   />
  </>
 );
}
