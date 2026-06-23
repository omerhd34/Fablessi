import { cn } from "@/lib/utils";

export function AdminPageHeader({ title, description, children, className }) {
 return (
  <div
   className={cn(
    "flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between",
    className
   )}
  >
   <div className="space-y-1">
    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
     {title}
    </h1>
    {description ? (
     <p className="max-w-5xl text-sm text-muted-foreground sm:text-base">{description}</p>
    ) : null}
   </div>
   {children ? (
    <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
     {children}
    </div>
   ) : null}
  </div>
 );
}
