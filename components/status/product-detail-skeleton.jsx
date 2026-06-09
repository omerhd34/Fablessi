import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
 return (
  <div
   className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,19rem)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,21rem)] xl:gap-10"
   role="status"
   aria-busy="true"
   aria-label="Loading"
  >
   <div className="flex flex-col gap-4 lg:gap-5">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full max-w-xs" />
    <div className="mt-2 flex flex-wrap gap-2">
     {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} className="h-9 w-16 rounded-full" />
     ))}
    </div>
    <Skeleton className="mt-4 h-11 w-full rounded-full" />
   </div>

   <div className="flex flex-col gap-4">
    <Skeleton className="aspect-4/3-full rounded-3xl" />
    <div className="grid grid-cols-4 gap-2">
     {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} className="aspect-square rounded-xl" />
     ))}
    </div>
   </div>

   <div className="hidden flex-col gap-4 lg:flex">
    <Skeleton className="h-5 w-32" />
    <div className="flex flex-col gap-3">
     {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-20 w-full rounded-2xl" />
     ))}
    </div>
   </div>
  </div>
 );
}
