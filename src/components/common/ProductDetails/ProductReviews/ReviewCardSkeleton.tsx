import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewCardSkeleton() {
  return (
    <div className="w-full p-4 space-y-3">
      {/* Header with avatar, name, date, and rating */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar skeleton */}
          <Skeleton className="w-12 h-12 rounded-full" />

          {/* Name and date skeleton */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Star rating skeleton */}
        <div className="flex gap-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-4 h-4" />
            ))}
        </div>
      </div>

      {/* Review text skeleton - multiple lines */}
      <div className="space-y-2 pt-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
