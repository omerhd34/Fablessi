"use client";

import Image from "next/image";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VariantImagesEditor({
 images = [],
 productName = "",
 uploading = false,
 uploadStatus = "",
 onSelectFile,
 onDropFiles,
 onSetPrimary,
 onMove,
 onRemove,
}) {
 const [isDragging, setIsDragging] = useState(false);
 const isDisabled = uploading;

 function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = isDisabled ? "none" : "copy";
  if (!isDisabled) setIsDragging(true);
 }

 function handleDragLeave(event) {
  if (event.currentTarget.contains(event.relatedTarget)) return;
  setIsDragging(false);
 }

 function handleDrop(event) {
  event.preventDefault();
  setIsDragging(false);
  if (isDisabled) return;
  const files = Array.from(event.dataTransfer.files ?? []);
  if (files.length) onDropFiles?.(files);
 }

 return (
  <div
   className={cn(
    "space-y-3 rounded-lg border border-dashed bg-muted/10 p-3 transition-[border-color,box-shadow,background-color] duration-150",
    isDragging
     ? "border-charcoal/40 bg-muted/30 shadow-[0_0_0_3px_oklch(0.22_0.01_260/12%)]"
     : "border-border/70"
   )}
   onDragEnter={handleDragOver}
   onDragOver={handleDragOver}
   onDragLeave={handleDragLeave}
   onDrop={handleDrop}
  >
   <div className="flex min-h-8 items-center gap-3 rounded-lg border border-dashed border-border/70 bg-background/80 px-3 py-2">
    <Button
     type="button"
     variant="outline"
     size="sm"
     className="cursor-pointer shrink-0"
     disabled={isDisabled}
     onClick={onSelectFile}
    >
     {uploading ? "Yükleniyor…" : "Dosya seç"}
    </Button>
    <p className="min-w-0 truncate text-sm text-muted-foreground">
     {isDragging
      ? "Görselleri bırakın"
      : uploadStatus ||
        (images.length > 0
         ? `${images.length} görsel eklendi. Sürükleyip bırakabilirsiniz.`
         : "JPG, PNG veya WebP seçin ya da sürükleyip bırakın.")}
    </p>
   </div>

   {images.length === 0 ? (
    <p className="text-sm text-muted-foreground">Henüz görsel eklenmedi.</p>
   ) : (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
     {images.map((image, imageIndex) => (
      <div key={`${image.url}-${imageIndex}`} className="space-y-2 rounded-lg border bg-background p-2.5">
       <div className="relative aspect-4/3 overflow-hidden rounded-md bg-muted">
        <Image
         src={image.url}
         alt={image.alt || productName}
         fill
         className="object-cover"
         sizes="200px"
        />
       </div>
       <div className="flex flex-wrap gap-2">
        <Button
         type="button"
         size="sm"
         className="cursor-pointer"
         variant={image.isPrimary ? "default" : "outline"}
         onClick={() => onSetPrimary(imageIndex)}
        >
         {image.isPrimary ? "Kapak" : "Kapak yap"}
        </Button>
        <Button
         type="button"
         size="sm"
         variant="outline"
         className="cursor-pointer"
         onClick={() => onMove(imageIndex, -1)}
         disabled={imageIndex === 0}
        >
         ↑
        </Button>
        <Button
         type="button"
         size="sm"
         variant="outline"
         className="cursor-pointer"
         onClick={() => onMove(imageIndex, 1)}
         disabled={imageIndex === images.length - 1}
        >
         ↓
        </Button>
        <Button
         type="button"
         size="sm"
         variant="outline"
         className="cursor-pointer border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
         onClick={() => onRemove(imageIndex)}
        >
         <MdDeleteOutline aria-hidden />
         Kaldır
        </Button>
       </div>
      </div>
     ))}
    </div>
   )}
  </div>
 );
}
