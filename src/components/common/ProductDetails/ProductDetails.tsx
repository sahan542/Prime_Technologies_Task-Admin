"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/reducers/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/reducers/wishlistSlice";
import { Heart, MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import BestSellers from "./BestSellers";
import ProductGallery from "./ProductGallery";
import ProductReviews from "./ProductReviews/ProductReviews";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetails({
  productSlug,
}: {
  productSlug: string;
}) {
  const [quantity, setQuantity] = useState(1);

  const { data: singleProduct, isLoading: isSingleProductLoading } =
    useGetSingleProductQuery(productSlug);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  if (isSingleProductLoading) {
    return <MyLoader />;
  }

  const handleAddToCart = () => {
    const alreadyCart = cartItems.some(
      (item) => item.product.id === singleProduct.data._id
    );

    if (alreadyCart) {
      toast.error("Already you have added in cart!");
    } else if (singleProduct.data.stock === 0) {
      toast.error("Out of stock!");
    } else {
      dispatch(addToCart({ product: singleProduct.data, quantity: quantity }));

      toast.success("Add to cart success");
    }
  };

  // handle increase quantity
  const handleIncreaseQuantity = () => {
    console.log("dd");
    setQuantity((prev) => prev + 1);
  };

  const alreadyInWishlist = wishlistItems.some(
    (item) => item.id === singleProduct.data._id
  );

  // handle add to wishlist
  const handleAddToWishlist = () => {
    if (alreadyInWishlist) {
      toast.warning("Already you have added in wishlist!");
    } else {
      dispatch(addToWishlist(singleProduct.data));

      toast.success("Add to wishlist success");
    }
  };

  // handle remove from wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(singleProduct.data._id));
    toast.success("Remove from wishlist success");
  };

  return (
    <div className="py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products?category=${singleProduct.data.category}`}
          className="hover:text-primary"
        >
          {singleProduct.data.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{singleProduct.data.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left column - Product images */}
        <div className="md:col-span-5">
          <ProductGallery singleProduct={singleProduct.data} />
        </div>

        {/* Middle column - Product info */}
        <div className="md:col-span-4">
          <p className="text-base lg:text-2xl font-bold text-gray-900 mb-2">
            {singleProduct.data.name}
          </p>

          <div className="flex items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(singleProduct.data.averageRatings)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({singleProduct.data.totalReviews} reviews)
              </span>
              <Badge
                variant={
                  singleProduct.data.stock > 0 ? "default" : "destructive"
                }
              >
                {singleProduct.data.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            {/* <p className="text-3xl font-bold text-primary">
              ৳{singleProduct.data.price}
            </p> */}
            <span className="text-primary font-medium text-lg">
              ৳ {singleProduct.data.price.toFixed(0)}{" "}
              <del className="text-gray-300 ml-1 text-base">
                {singleProduct.data.price + 50}{" "}
              </del>
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Stock:{" "}
              {singleProduct.data.stock > 0
                ? `${singleProduct.data.stock} units available`
                : "Out of stock"}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center border border-primary/10 rounded-md">
                <button
                  onClick={() => setQuantity((prev) => prev - 1)}
                  className="px-3 py-3 cursor-pointer bg-primary/10 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="px-3 py-3 cursor-pointer bg-primary/10 disabled:cursor-not-allowed"
                  disabled={quantity >= singleProduct.data.stock}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                {alreadyInWishlist ? (
                  <span onClick={handleRemoveFromWishlist}>
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  </span>
                ) : (
                  <span onClick={handleAddToWishlist}>
                    <Heart className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-4">
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Category:</span>{" "}
              {singleProduct.data.category.replace("_", " ")}
            </p>
            {singleProduct.data.tags && (
              <div className="flex flex-wrap gap-2">
                <span className="font-medium text-sm text-gray-500">Tags:</span>
                {singleProduct.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {tag.replace("_", " ")}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column - Best sellers */}
        <div className="md:col-span-3 hidden  md:block">
          <BestSellers />
        </div>
      </div>

      {/* Tabs section */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full md:w-[300px] justify-start rounded-none bg-transparent h-auto">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-6 py-3 cursor-pointer"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-6 py-3 cursor-pointer"
            >
              Reviews ({singleProduct.data.totalReviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div
              className="prose max-w-none html-content"
              dangerouslySetInnerHTML={{
                __html: singleProduct.data.description,
              }}
            />
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={singleProduct.data._id} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      <RelatedProducts tags={singleProduct.data.tags} />

      <div className="md:hidden">
        <BestSellers />
      </div>
    </div>
  );
}
