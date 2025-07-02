"use client";

import { PaginationSkeleton } from "@/components/shared/Ui/PaginationSkeleton";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/";
import useDebounced from "@/hooks/useDebounced";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/types";
import { getPaginationPageItems } from "@/utils/getPaginationPageItems";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import { ProductCard } from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductHeader from "./ProductHeader";

const Products = ({
  categoryParam,
  searchTermParam,
}: {
  categoryParam?: string;
  searchTermParam?: string;
}) => {
  const [category, setCategory] = useState(categoryParam || "");
  const [priceRange, setPriceRange] = useState("");
  const [searchTerm, setSearchTerm] = useState(searchTermParam || "");
  const [currentSortOption, setCurrentSortOption] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // Number of items per page

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  const query: Record<string, any> = {};

  if (debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (category) {
    query["category"] = category;
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-");

    query["minPrice"] = Number(minPrice);
    query["maxPrice"] = Number(maxPrice);
  }

  if (currentSortOption !== "all") {
    query["sort"] = currentSortOption;
  }

  if (currentPage) {
    query["page"] = currentPage;
  }
  if (limit) {
    query["limit"] = limit;
  }

  // RTK Query hook
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery(query);

  // handle category change from the filter bar
  const handleCategoryChange = (newCategory: string) => {
    // setSearchTerm("");
    setCategory(newCategory);
  };

  // handle price range change from the filter bar
  const handlePriceRangeChange = (newPriceRange: string) => {
    // setSearchTerm("");
    setPriceRange(newPriceRange);
  };

  // handle search change from the filter bar
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Handle sorting change from the header
  const handleSortChange = (sortOption: string) => {
    setCurrentSortOption(sortOption);
  };

  const totalData = productsData?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalData / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Get pagination items based on current page and total pages
  const pageNumbers = getPaginationPageItems(currentPage, totalPages);

  useEffect(() => {
    // setSearchTerm("");
    setCategory(categoryParam || "");
    setCurrentPage(1); // Optional: reset pagination on filter change
  }, [categoryParam]);

  return (
    <div className="py-16 grid grid-cols-12 gap-8">
      {/* additional filters */}
      <div className="col-span-3 hidden lg:block">
        <FilterBar
          onCategoryChange={handleCategoryChange}
          onPriceRangeChange={handlePriceRangeChange}
        />
      </div>

      <div className="col-span-12 lg:col-span-9">
        {/* title something */}
        <ProductHeader
          categoryName={category}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
          onPriceRangeChange={handlePriceRangeChange}
          onSearchChange={handleSearchChange}
        />

        <div>
          {isProductsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(12)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div>
              {productsData.data.data.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {productsData.data.data.map((product: TProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-24">
                  <h4 className="text-xl md:text-2xl font-medium">
                    No Product Found!
                  </h4>
                </div>
              )}
            </div>
          )}
        </div>

        {/* pagination */}
        {productsData?.data?.data?.length > 0 && (
          <div className="flex justify-center items-center mt-8">
            {isProductsLoading ? (
              <PaginationSkeleton />
            ) : (
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {/* <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              /> */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="cursor-pointer mr-2 border-none bg-primary/20"
                      >
                        {/* Icon only on mobile */}
                        <span className="block md:hidden">
                          <ChevronLeft />
                        </span>

                        {/* Icon + text on desktop */}
                        <span className="hidden md:flex items-center gap-1">
                          <ChevronLeft />
                          <span>Previous</span>
                        </span>
                      </Button>
                    </PaginationItem>

                    {pageNumbers.map((page, idx) => (
                      <PaginationItem key={idx}>
                        {page === "..." ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => handlePageChange(Number(page))}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      {/* <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              /> */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="cursor-pointer ml-2 border-none bg-primary/20"
                      >
                        {/* Mobile: icon only */}
                        <span className="block md:hidden">
                          <ChevronRight />
                        </span>

                        {/* Desktop: icon + text */}
                        <span className="hidden md:flex items-center gap-1">
                          <span>Next</span>
                          <ChevronRight />
                        </span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
