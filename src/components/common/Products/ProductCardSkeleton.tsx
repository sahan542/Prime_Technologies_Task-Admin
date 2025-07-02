import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="w-full md:max-w-[300px] overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-[16/9] rounded-t-md rounded-b-none w-full" />

      <CardContent className="p-4 space-y-3">
        {/* Title skeleton - two lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Rating skeleton */}
        <div className="flex gap-1 py-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-full" />
            ))}
        </div>

        {/* Price and cart button skeleton */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardContent>
    </div>
  );
}
