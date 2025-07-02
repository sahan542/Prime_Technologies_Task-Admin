"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/reducers/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/reducers/wishlistSlice";
import { TProduct } from "@/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function ProductCard({ product }: { product: TProduct }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleAddToCart = () => {
    const alreadyCart = cartItems.some(
      (item) => item.product.slug === product.slug
    );

    if (alreadyCart) {
      toast.error("Already you have added in cart!");
    } else if (product.stock === 0) {
      toast.error("Out of stock!");
    } else {
      dispatch(addToCart({ product, quantity: 1 }));

      toast.success("Add to cart success");
    }
  };

  const alreadyInWishlist = wishlistItems.some(
    (item) => item.id === product.id
  );

  // handle add to wishlist
  const handleAddToWishlist = () => {
    if (alreadyInWishlist) {
      toast.warning("Already you have added in wishlist!");
    } else {
      dispatch(addToWishlist(product));

      toast.success("Add to wishlist success");
    }
  };

  // handle remove from wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(product.id));
    toast.success("Remove from wishlist success");
  };

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white border border-gray-200 rounded-none overflow-hidden transition-all duration-300 hover:shadow-cardLightShadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain"
        />

        {/* Wishlist Button */}
        {product.stock > 0 ? (
          <>
            {alreadyInWishlist ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromWishlist();
                }}
                className={cn(
                  "absolute top-2 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-red-500"
                )}
                aria-label="Add to wishlist"
              >
                <Heart className={cn("h-5 w-5 fill-red-500")} />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist();
                }}
                className={cn(
                  "absolute top-2 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-gray-500 hover:text-red-500"
                )}
                aria-label="Add to wishlist"
              >
                <Heart className={cn("h-5 w-5")} />
              </button>
            )}
          </>
        ) : (
          <Badge
            variant="destructive"
            className="absolute top-16 right-0 rotate-45 origin-top-right"
          >
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col px-2 py-4 md:p-4 flex-grow">
        <h5 className="text-sm font-medium line-clamp-2 mb-2 leading-4">
          {product.name}
        </h5>

        {/* Star Rating */}
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={cn(
                "w-4 h-4",
                i < product.averageRatings ? "text-yellow-400" : "text-gray-300"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Price and Cart */}
      <div className="flex items-center justify-between px-2 py-4 md:p-4 pt-0 mt-auto">
        <span className="text-primary font-medium text-sm">
          ৳ {product.price.toFixed(0)}{" "}
          <del className="text-gray-300 md:ml-[2px] text-base">
            {product.price + 50}{" "}
          </del>
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="cursor-pointer"
          aria-label="Add to cart"
          size="sm"
        >
          <ShoppingCart className="h-5 w-5" /> Buy
        </Button>
      </div>
    </div>
  );
}
