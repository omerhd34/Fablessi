"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { XIcon } from "@/lib/icons";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DeleteButton({
 href,
 label = "Sil",
 confirmTitle = "Silmek istediğinize emin misiniz?",
 confirmDescription = "Bu işlem geri alınamaz.",
 redirectTo,
 onDeleted,
 size,
 iconOnly = true,
 className,
}) {
 const router = useRouter();
 const [loading, setLoading] = useState(false);

 async function handleDelete() {
  setLoading(true);
  try {
   const response = await fetch(href, { method: "DELETE" });
   if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Silinemedi");
   }
   toast.success("Silindi");
   await onDeleted?.();
   if (redirectTo) {
    router.push(redirectTo);
   }
   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
    <Button
     type="button"
     variant="destructive"
     size={iconOnly ? size ?? "icon-lg" : "default"}
     className={cn(iconOnly ? "cursor-pointer" : "cursor-pointer gap-2", className)}
     disabled={loading}
     aria-label={iconOnly ? "Sil" : undefined}
    >
     {iconOnly ? (
      <MdDeleteOutline className="size-5" />
     ) : (
      <>
       <MdDeleteOutline className="size-4" aria-hidden />
       {label}
      </>
     )}
    </Button>
   </AlertDialogTrigger>
   <AlertDialogContent className="gap-6 p-6 sm:max-w-md">
    <div className="relative">
     <AlertDialogCancel
      variant="ghost"
      size="icon-sm"
      className="absolute top-0 right-0 cursor-pointer"
     >
      <XIcon />
      <span className="sr-only">Kapat</span>
     </AlertDialogCancel>
     <AlertDialogHeader className="gap-2 pr-8">
      <AlertDialogTitle className="text-lg">{confirmTitle}</AlertDialogTitle>
      <AlertDialogDescription className="text-sm leading-relaxed">
       {confirmDescription}
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter className="-mx-6 -mb-6 mt-2 py-5">
      <AlertDialogCancel className="cursor-pointer">İptal</AlertDialogCancel>
      <AlertDialogAction className="cursor-pointer" onClick={handleDelete} disabled={loading}>
       {loading ? "Siliniyor…" : "Sil"}
      </AlertDialogAction>
     </AlertDialogFooter>
    </div>
   </AlertDialogContent>
  </AlertDialog>
 );
}
