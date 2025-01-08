import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galería Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 flex-1" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
