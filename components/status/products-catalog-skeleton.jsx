import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
 return (
  <div className="product-card-kalif flex flex-col">
   <Skeleton className="aspect-4/5 w-full rounded-none" />
   <div className="flex flex-col gap-2 p-4">
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-3 w-1/3" />
   </div>
  </div>
 );
}

export function ProductsCatalogSkeleton() {
 return (
  <div
   className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12"
   role="status"
   aria-busy="true"
   aria-label="Loading"
  >
   <aside className="hidden w-full max-w-[15rem] shrink-0 flex-col gap-6 lg:flex">
    <Skeleton className="h-5 w-24" />
    <div className="flex flex-col gap-3">
     {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-4 w-full" />
     ))}
    </div>
    <Skeleton className="h-5 w-20" />
    <div className="flex flex-wrap gap-2">
     {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} className="h-8 w-16 rounded-full" />
     ))}
    </div>
   </aside>

   <div className="min-w-0 flex-1">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
     <Skeleton className="h-8 w-48" />
     <div className="flex gap-2">
      <Skeleton className="h-10 w-full max-w-xs rounded-full sm:w-56" />
      <Skeleton className="h-10 w-32 rounded-full" />
     </div>
    </div>

    <div className="mb-8 flex gap-3 overflow-hidden">
     {Array.from({ length: 6 }).map((_, index) => (
      <Skeleton key={index} className="h-24 w-28 shrink-0 rounded-2xl" />
     ))}
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6 xl:grid-cols-4">
     {Array.from({ length: 8 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
     ))}
    </div>
   </div>
  </div>
 );
}
