import { Skeleton } from "@/components/ui/skeleton";

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous button skeleton */}
      <div className="flex items-center">
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* Page numbers skeleton */}
      {[1, 2, 3, 4].map((page) => (
        <div key={page} className="flex items-center justify-center">
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      ))}

      {/* Next button skeleton */}
      <div className="flex items-center">
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
}
