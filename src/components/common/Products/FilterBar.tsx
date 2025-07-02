"use client";

import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import CategoriesSkeleton from "./CategoriesSkeleton";
import PriceFilter from "./PriceFilter";

// Category component that handles its own expanded state
const CategoryItem = ({
  category,
  onCategoryChange,
}: {
  category: TCategory;
  onCategoryChange: (newCategory: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubcategories =
    category.subCategories && category.subCategories.length > 0;

  return (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between py-2 px-3 cursor-pointer rounded-md ${
          hasSubcategories ? "" : ""
        }`}
        onClick={() => hasSubcategories && setExpanded(!expanded)}
      >
        <span
          onClick={() => {
            // e.stopPropagation();
            onCategoryChange(category.slug);
          }}
          className="font-medium hover:text-primary flex-1 hover:underline transition-all duration-300"
        >
          {category.title}
        </span>

        {hasSubcategories && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-1 rounded-full hover:bg-primary/10"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 cursor-pointer" />
            ) : (
              <ChevronRight className="h-4 w-4 cursor-pointer" />
            )}
          </button>
        )}
      </div>

      {expanded && hasSubcategories && (
        <div className="pl-4">
          {category.subCategories.map((subCategory) => (
            <div key={subCategory._id} className="py-1.5 px-3">
              <span
                onClick={() => onCategoryChange(subCategory.slug)}
                className="text-gray-700 hover:text-primary text-sm flex items-center hover:underline transition-all duration-300 cursor-pointer"
              >
                {subCategory.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function FilterBar({
  onCategoryChange,
  onPriceRangeChange,
}: {
  onCategoryChange: (newCategory: string) => void;
  onPriceRangeChange: (newPriceRange: string) => void;
}) {
  // RTK Query hook
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  if (isCategoriesLoading) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className=" rounded-md">
      <h2 className="font-bold text-xl mb-3 uppercase">Categories</h2>

      <div className="space-y-1">
        <div className="py-2 px-3">
          <span
            onClick={() => {
              onCategoryChange("");
            }}
            className="font-medium hover:text-primary flex-1 hover:underline transition-all duration-300 cursor-pointer"
          >
            All Products
          </span>
        </div>

        <div className="space-y-1">
          {categoriesData.data.map((category: TCategory) => (
            <CategoryItem
              key={category._id}
              category={category}
              onCategoryChange={onCategoryChange}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-primary/20">
        <PriceFilter onPriceRangeChange={onPriceRangeChange} />
      </div>
    </div>
  );
}
