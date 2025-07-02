export function BestSellerCardSkeleton() {
  return (
    <div className="flex items-center p-4 border-b border-gray-100">
      {/* Image placeholder */}
      <div className="w-12 h-16 bg-gray-200 animate-pulse" />

      {/* Content */}
      <div className="ml-4 flex-1">
        {/* Title placeholder - two lines */}
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />

        {/* Price placeholder */}
        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mt-2" />
      </div>
    </div>
  );
}
