import { cn } from "@/lib/utils";

export function AdminMobileList({ className, children }) {
 return (
  <div className={cn("divide-y divide-border/70 md:hidden", className)}>{children}</div>
 );
}

export function AdminMobileListItem({ title, meta, actions, className }) {
 return (
  <div className={cn("flex items-start justify-between gap-3 px-4 py-3.5", className)}>
   <div className="min-w-0 flex-1 space-y-1.5">
    <p className="font-medium leading-snug">{title}</p>
    {meta ? <div className="flex flex-wrap items-center gap-x-2 gap-y-1">{meta}</div> : null}
   </div>
   {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
  </div>
 );
}
