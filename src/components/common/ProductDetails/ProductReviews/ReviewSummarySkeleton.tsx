import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewSummarySkeleton() {
  return (
    <div className="w-full max-w-2xl p-6 space-y-6 bg-white rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-5 w-20" />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left column - Overall rating */}
        <div className="text-center space-y-3">
          {/* Large rating number */}
          <Skeleton className="h-16 w-20 mx-auto" />

          {/* Star rating */}
          <div className="flex justify-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="w-6 h-6" />
              ))}
          </div>

          {/* Based on X reviews text */}
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>

        {/* Right column - Rating breakdown */}
        <div className="space-y-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                {/* Star count (5★, 4★, etc.) */}
                <Skeleton className="h-4 w-6 flex-shrink-0" />

                {/* Progress bar */}
                <Skeleton className="h-3 flex-1" />

                {/* Count */}
                <Skeleton className="h-4 w-4 flex-shrink-0" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
