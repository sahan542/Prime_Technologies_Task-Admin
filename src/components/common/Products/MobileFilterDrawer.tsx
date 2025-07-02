"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const PRICE_MIN = 0;
const PRICE_MAX = 2000;

export default function MobileFilterDrawer({
  onCategoryChange,
  onPriceRangeChange,
}: {
  onCategoryChange: (newCategory: string) => void;
  onPriceRangeChange: (newPriceRange: string) => void;
}) {
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const [displayRange, setDisplayRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);

  // RTK Query hook
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  if (isCategoriesLoading) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden flex items-center gap-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </Button>
    );
  }

  // price filter

  // Update the display range when the slider is being dragged
  const handleSliderChange = (value: number[]) => {
    setDisplayRange([value[0], value[1]]);
  };

  // Only update the actual filter when the slider is released
  const handleSliderCommit = (value: number[]) => {
    onPriceRangeChange(`${value[0]}-${value[1]}`);
  };

  // Format price with currency symbol
  const formatPrice = (price: number) => {
    return `₹ ${price.toLocaleString()}`;
  };

  return (
    <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
      <SheetTrigger asChild className="focus-visible:ring-0 border-none">
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden flex items-center gap-2 bg-primary/20 whitespace-nowrap cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[350px] overflow-y-auto bg-white p-4"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="-mt-8 pb-4 space-y-6">
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Categories</h2>

            <div className="py-2 px-3">
              <span
                onClick={() => {
                  setIsOpenSheet(false);
                  onCategoryChange("");
                }}
                className="font-medium hover:text-primary flex-1 hover:underline transition-all duration-300 cursor-pointer"
              >
                All Products
              </span>
            </div>

            {categoriesData.data.map((category: TCategory) => (
              <CategoryItem
                key={category._id}
                category={category}
                setIsOpenSheet={setIsOpenSheet}
                onCategoryChange={onCategoryChange}
              />
            ))}
          </div>
          <div className="border-t border-primary/20 pt-4">
            <div className="space-y-4">
              <h3 className="font-bold text-base uppercase">Filter by Price</h3>

              <div className="px-2 pt-2 pb-6">
                <Slider
                  defaultValue={[PRICE_MIN, PRICE_MAX]}
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={10}
                  value={displayRange}
                  onValueChange={handleSliderChange}
                  // onValueCommit={handleSliderCommit}
                  className="my-6 bg-gray-200 rounded-full"
                />

                <div className="flex items-center justify-between">
                  <Button
                    variant="default"
                    className="bg-black hover:bg-gray-800 text-white rounded-full px-6 cursor-pointer"
                    onClick={() => {
                      handleSliderCommit(displayRange);
                      setIsOpenSheet(false);
                    }}
                  >
                    Filter
                  </Button>
                  <div className="text-sm">
                    Price: {formatPrice(displayRange[0])} —{" "}
                    {formatPrice(displayRange[1])}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const CategoryItem = ({
  category,
  setIsOpenSheet,
  onCategoryChange,
}: {
  category: TCategory;
  setIsOpenSheet: (open: boolean) => void;
  onCategoryChange: (newCategory: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubcategories =
    category.subCategories && category.subCategories.length > 0;

  const handleCategoryClick = (slug: string) => {
    setIsOpenSheet(false);

    onCategoryChange(slug);
  };

  return (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between py-2 px-3 cursor-pointer rounded-md ${
          hasSubcategories ? "" : ""
        }`}
        onClick={() => hasSubcategories && setExpanded(!expanded)}
      >
        <span
          onClick={() => handleCategoryClick(category.slug)}
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
          {category.subCategories.map((subCategory: TCategory) => (
            <div key={subCategory._id} className="py-1.5 px-3">
              <span
                onClick={() => handleCategoryClick(subCategory.slug)}
                className="text-gray-700 hover:text-primary text-sm flex items-center hover:underline transition-all duration-300"
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
