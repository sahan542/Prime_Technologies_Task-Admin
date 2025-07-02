const CategoriesSkeleton = () => {
  return (
    <div>
      <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: 11 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            {index < 7 && (
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
