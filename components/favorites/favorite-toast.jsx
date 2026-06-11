"use client";

import { toast } from "sonner";
import { CloseIcon, Heart, HeartFilled } from "@/lib/icons";

const FAVORITE_TOAST_ID = "favorite-toast";

function FavoriteToastContent({
 id,
 added,
 title,
 description,
 closeLabel,
}) {
 return (
  <div
   role="status"
   aria-live="polite"
   className="pointer-events-auto flex w-[min(100vw-2rem,22rem)] items-start gap-3 rounded-2xl border border-charcoal/10 bg-white/96 p-3.5 shadow-[0_12px_40px_rgb(0_0_0/12%)] backdrop-blur-md"
  >
   <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
    {added ? (
     <HeartFilled className="size-5" aria-hidden />
    ) : (
     <Heart className="size-5" aria-hidden />
    )}
   </div>

   <div className="min-w-0 flex-1 pt-0.5">
    <p className="text-sm font-semibold leading-snug text-charcoal">{title}</p>
    {description ? (
     <p className="text-muted-foreground mt-0.5 truncate text-xs leading-relaxed">
      {description}
     </p>
    ) : null}
   </div>

   <button
    type="button"
    onClick={() => toast.dismiss(id)}
    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-charcoal/45 transition hover:bg-charcoal/6 hover:text-charcoal"
    aria-label={closeLabel}
   >
    <CloseIcon className="size-4" aria-hidden />
   </button>
  </div>
 );
}

export function showFavoriteToast({ added, title, description, closeLabel }) {
 toast.dismiss(FAVORITE_TOAST_ID);

 toast.custom(
  (id) => (
   <FavoriteToastContent
    id={id}
    added={added}
    title={title}
    description={description}
    closeLabel={closeLabel}
   />
  ),
  {
   id: FAVORITE_TOAST_ID,
   duration: 3200,
   unstyled: true,
   closeButton: false,
   classNames: {
    toast:
     "!min-h-0 !gap-0 !border-0 !bg-transparent !p-0 !shadow-none !backdrop-blur-none",
   },
  }
 );
}
