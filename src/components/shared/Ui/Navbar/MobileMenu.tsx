"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/reducers/authSlice";
import { TCategory } from "@/types/category.type";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActiveLink from "../ActiveLink";
import SearchInput from "./SearchInput";

export function MobileMenu({
  categories,
  setIsMobileMenuOpen,
}: {
  categories: TCategory[];
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const router = useRouter();

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const user = useAppSelector(useCurrentUser);

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex flex-col h-full overflow-auto px-4 -mt-8 bg-secondary text-white">
      <div className="mb-4">
        <SearchInput />
      </div>
      <nav className="flex-1 space-y-1">
        {/* Home Link */}
        <div className="">
          <ActiveLink href="/" exact className="py-2 rounded-md">
            Home
          </ActiveLink>
        </div>

        {/* Products Link */}
        <div className="">
          <ActiveLink href="/products" className="py-2 rounded-md">
            Products
          </ActiveLink>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category._id} className="py-1">
            <div className="flex w-full items-center justify-between rounded-md py-2">
              <span
                onClick={() => {
                  setIsMobileMenuOpen(false);

                  router.push(`/products?category=${category.slug}`);
                }}
                className="flex-1 text-left text-sm font-medium hover:text-primary transition-colors duration-300 px-4"
              >
                {category.title}
              </span>
              {category.subCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-6 w-8"
                  onClick={() => toggleCategory(category._id)}
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      expandedCategory === category._id && "rotate-180"
                    )}
                  />
                  <span className="sr-only">
                    Toggle {category.title} submenu
                  </span>
                </Button>
              )}
            </div>
            {category.subCategories.length > 0 && (
              <div
                className={cn(
                  "ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out",
                  expandedCategory === category._id
                    ? "max-h-auto opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                {category.subCategories.map((subcategory) => (
                  <span
                    key={subcategory._id}
                    onClick={() => {
                      setIsMobileMenuOpen(false);

                      router.push(`/products?category=${subcategory.slug}`);
                    }}
                    className="block rounded-md py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 px-4"
                  >
                    {subcategory.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* About Us Link */}
        <div className="py-1">
          <div className="flex w-full items-center justify-between rounded-md py-2">
            <ActiveLink href={`/about`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                About Us
              </span>
            </ActiveLink>
          </div>
        </div>

        {/* Contact Us Link */}
        <div className="py-1">
          <div className="flex w-full items-center justify-between rounded-md py-2">
            <ActiveLink href={`/contact`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Contact Us
              </span>
            </ActiveLink>
          </div>
        </div>

        <>
          {user && (
            <>
              {isAdmin && (
                <div className="py-1">
                  <div className="flex w-full items-center justify-between rounded-md py-2">
                    <ActiveLink href={`/dashboard/admin`}>
                      <span className="font-medium transition-colors duration-300 hover:text-primary">
                        Dashboard
                      </span>
                    </ActiveLink>
                  </div>
                </div>
              )}

              {/* {isUser && (
                <div className="py-1">
                  <div className="flex w-full items-center justify-between rounded-md py-2">
                    <ActiveLink href={`/dashboard/user`}>
                      <span className="font-medium transition-colors duration-300 hover:text-primary">
                        Dashboard
                      </span>
                    </ActiveLink>
                  </div>
                </div>
              )} */}
            </>
          )}
        </>
      </nav>
      {/* <div className="border-t pt-4 mt-4">
        <Link
          href="/account"
          className="flex items-center rounded-md py-2 text-sm font-medium transition-colors duration-150 hover:text-primary"
        >
          <User className="mr-2 h-4 w-4" />
          My Account
        </Link>
        <Link
          href="/cart"
          className="flex items-center rounded-md py-2 text-sm font-medium transition-colors duration-150 hover:text-primary"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Shopping Cart
        </Link>
      </div> */}
    </div>
  );
}
