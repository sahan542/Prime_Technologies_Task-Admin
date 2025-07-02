"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import MobileFilterDrawer from "./MobileFilterDrawer";

type TProductHeaderProps = {
  categoryName: string;
  onSortChange: (sortOption: string) => void;
  onCategoryChange: (newCategory: string) => void;
  onPriceRangeChange: (newPriceRange: string) => void;
  onSearchChange: (newSearchTerm: string) => void;
};

export default function ProductHeader({
  categoryName,
  onSortChange,
  onCategoryChange,
  onPriceRangeChange,
  onSearchChange,
}: TProductHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  // Handle sort option selection
  const handleSortChange = (option: string) => {
    setSortOption(option);
    // Call the parent's onSortChange callback with the new sort option
    onSortChange(option);
  };

  // Remove an active filter
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  // Clear all active filters
  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const sortOptions = [
    { label: "Normal", value: "all" },
    { label: "Price: Low to High", value: "price:low_to_high" },
    { label: "Price: High to Low", value: "price:high_to_low" },
    { label: "Newest", value: "newest" },
    { label: "Best Selling", value: "best_selling" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Name: A to Z", value: "sort:a_to_z" },
    { label: "Name: Z to A", value: "sort:z_to_a" },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        {/* Search bar */}
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder={`Search ${categoryName || "products"}...`}
            className="pl-10 pr-4 h-10 w-full border-none bg-primary/10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex justify-center items-center gap-4 mt-4 lg:mt-0">
          <div className="lg:hidden">
            <MobileFilterDrawer
              onCategoryChange={onCategoryChange}
              onPriceRangeChange={onPriceRangeChange}
            />
          </div>

          {/* Sort dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="focus-visible:ring-0 border-none"
            >
              <Button
                variant="outline"
                size="sm"
                className="bg-primary/20 whitespace-nowrap cursor-pointer"
              >
                <ArrowUpDown className="mr-1 h-3.5 w-3.5" />
                <span>{sortOption ? sortOption : "Featured"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              {sortOptions.map((option: TSortOption) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className="cursor-pointer hover:bg-primary/10"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Select
            value={sortOption}
            onValueChange={(value: string) => handleSortChange(value)}
          >
            <SelectTrigger className="w-56 border border-primary/10">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <span className="sr-only">Remove {filter} filter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </Badge>
          ))}
          <Button
            variant="link"
            size="sm"
            className="text-xs"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
