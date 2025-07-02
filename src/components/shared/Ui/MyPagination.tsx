import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getPaginationPageItems } from "@/utils/getPaginationPageItems";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TMyPaginationProps = {
  onPageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
};

const MyPagination = ({
  onPageChange,
  totalPages,
  currentPage,
}: TMyPaginationProps) => {
  // Get pagination items based on current page and total pages
  const pageNumbers = getPaginationPageItems(currentPage, totalPages);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {/* <PaginationPrevious
                          onClick={() => onPageChange(currentPage - 1)}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        /> */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
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

          {pageNumbers.map((page: string | number, idx: number) => (
            <PaginationItem key={idx}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(Number(page))}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            {/* <PaginationNext
                          onClick={() => onPageChange(currentPage + 1)}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        /> */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
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
  );
};

export default MyPagination;
