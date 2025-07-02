"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type TPriceFilterProps = {
  minPrice?: number;
  maxPrice?: number;
  onPriceRangeChange: (newPriceRange: string) => void;
};

export default function PriceFilter({
  minPrice = 0,
  maxPrice = 5000,
  onPriceRangeChange,
}: TPriceFilterProps) {
  const [displayRange, setDisplayRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

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
    <div className="space-y-4">
      <h3 className="font-bold text-base uppercase">Filter by Price</h3>

      <div className="px-2 pt-2 pb-6">
        <Slider
          defaultValue={[minPrice, maxPrice]}
          min={minPrice}
          max={maxPrice}
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
            onClick={() => handleSliderCommit(displayRange)}
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
  );
}
