"use client";

import Image from "next/image";
import { useRef } from "react";
import { MdCloudUpload, MdDeleteOutline, MdImage } from "react-icons/md";
import { toast } from "sonner";
import { IMAGE_UPLOAD_MAX_SIZE_LABEL, validateImageUploadFile } from "@/lib/admin/image-upload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ACCEPT = "image/jpeg,image/png,image/webp";

function AdminUploadSpinner({ className }) {
 return (
  <div
   role="status"
   aria-label="Yükleniyor"
   className={cn(
    "rounded-full border-[3px] border-charcoal/10 border-t-charcoal/70 animate-spin",
    className
   )}
  />
 );
}

export function AdminImageUpload({
 label = "Kapak görseli",
 value = "",
 defaultPreview = "",
 onChange,
 onUpload,
 uploading = false,
 disabled = false,
 hint = `JPG, PNG veya WebP - Maks. ${IMAGE_UPLOAD_MAX_SIZE_LABEL}`,
 dropzoneHint,
 previewAspectClass = "aspect-16/10",
 previewHeightClass = "",
 hintMinHeightClass = "",
 stretch = false,
 fullWidth = false,
 className,
}) {
 const inputRef = useRef(null);
 const isDisabled = disabled || uploading;
 const hasCustomImage = Boolean(value);
 const previewSrc = value || defaultPreview;
 const showPreview = Boolean(previewSrc);

 async function processFile(file) {
  if (!file || isDisabled) return;

  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  await onUpload(file);
 }

 function openFilePicker() {
  if (isDisabled) return;
  inputRef.current?.click();
 }

 function handleFileChange(event) {
  void processFile(event.target.files?.[0]);
  event.target.value = "";
 }

 const previewClassName = cn(
  "relative w-full overflow-hidden bg-muted",
  previewHeightClass || previewAspectClass,
  !previewHeightClass && "max-h-80"
 );

 return (
  <div className={cn(stretch ? "flex h-full flex-col space-y-3" : "space-y-3", className)}>
   <div className={cn("space-y-1", hintMinHeightClass)}>
    <Label>{label}</Label>
    {hint ? (
     <p
      className={cn(
       "text-[11px] leading-snug text-muted-foreground",
       fullWidth && "line-clamp-2"
      )}
     >
      {hint}
     </p>
    ) : null}
   </div>

   <input
    ref={inputRef}
    type="file"
    accept={ACCEPT}
    className="sr-only"
    onChange={handleFileChange}
    disabled={isDisabled}
    tabIndex={-1}
    aria-hidden
   />

   <div
    className={cn(
     "overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm",
     fullWidth ? "w-full" : "mx-auto w-full max-w-2xl",
     stretch && "flex flex-1 flex-col"
    )}
   >
    <div className={cn(previewClassName, "select-none")}>
     {showPreview ? (
      <Image
       src={previewSrc}
       alt={label}
       fill
       unoptimized={Boolean(value)}
       className="pointer-events-none object-cover object-center"
       sizes="(max-width: 768px) 100vw, 640px"
      />
     ) : (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
       <MdImage className="size-10 opacity-60" aria-hidden />
       <p className="text-sm">Henüz görsel yüklenmedi</p>
      </div>
     )}

     {!hasCustomImage && showPreview && !uploading ? (
      <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full border border-white/35 bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
       Varsayılan görsel
      </span>
     ) : null}

     {hasCustomImage && !uploading ? (
      <Button
       type="button"
       variant="secondary"
       size="icon"
       className="absolute top-3 right-3 z-10 size-10 cursor-pointer border-border/70 bg-background/95 text-destructive shadow-md backdrop-blur-sm hover:bg-background hover:text-destructive"
       disabled={isDisabled}
       aria-label="Görseli kaldır"
       onClick={() => onChange("")}
      >
       <MdDeleteOutline className="size-5" />
      </Button>
     ) : null}

     {uploading ? (
      <div className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-[2px]">
       <AdminUploadSpinner className="size-9" />
      </div>
     ) : null}
    </div>

    <div
     className={cn(
      "flex flex-col items-center gap-3 border-t border-border/70 px-4 py-3 sm:flex-row sm:justify-center",
      stretch && "mt-auto"
     )}
    >
     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      disabled={isDisabled}
      onClick={openFilePicker}
     >
      <MdCloudUpload className="size-4" />
      Değiştir
     </Button>
     {!showPreview && dropzoneHint ? (
      <p className="text-center text-xs text-muted-foreground sm:text-left">
       {dropzoneHint}
      </p>
     ) : null}
    </div>
   </div>
  </div>
 );
}
