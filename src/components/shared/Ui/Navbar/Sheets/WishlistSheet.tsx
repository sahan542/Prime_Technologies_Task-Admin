// "use client";

// import { Heart, ShoppingCart } from "lucide-react";
// import { useState } from "react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { addToCart } from "@/redux/reducers/cartSlice";
// import { removeFromWishlist } from "@/redux/reducers/wishlistSlice";
// import { TProduct } from "@/types";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import WishlistCard from "./WishListCard";
// import { Item } from "@radix-ui/react-radio-group";

// export default function WishlistSheet() {
//   const [isOpen, setIsOpen] = useState(false);

//   const router = useRouter();

//   const dispatch = useAppDispatch();
//   const cartItems = useAppSelector((state) => state.cart.items);
//   const wishlists = useAppSelector((state) => state.wishlist.items);

//   const removeItem = (productId: string) => {
//     dispatch(removeFromWishlist(productId));
//     console.log("in the remove wishlist : ",productId);
//   };

//   const addProductToCart = (product: TProduct) => {
//     console.log("executes add product to cart ");
//     console.log("executes add product to cart :  ",product);

//     const alreadyCart = cartItems.some(
//       (item) => item.product.slug === product.slug
//     );
//     console.log("already cart : ",alreadyCart);

//     if (alreadyCart) {
//       toast.error("Already you have added in cart!");
//     } else {
//       console.log("hello: ");
//       dispatch(addToCart({ product, quantity: 1 }));
//       dispatch(removeFromWishlist(product.id));
//       toast.success("Add to cart success");
//     }
//   };

//   // handle card click to navigate product details page
//   const handleCardClick = (productSlug: string) => {
//     router.push(`/products/${productSlug}`);
//     setIsOpen(false);
//   };

//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Heart className="h-5 w-5" />

//           {wishlists.length > 0 && (
//             <Badge
//               className="absolute -top-2 -right-2 h-5 w-5 bg-orange-600 rounded-full p-0 flex items-center justify-center text-xs"
//             >
//               {wishlists.length}
//             </Badge>
//           )}
//         </Button>
//       </SheetTrigger>
//       <SheetContent hideClose={false} className="w-full sm:max-w-[400px]">
//         <SheetHeader className="-mb-4 bg-[#7b1f4b]">
//           <SheetTitle className="flex items-center gap-2">
//             <ShoppingCart className="h-5 w-5" />
//             Your Wishlist Items
//           </SheetTitle>
//           <SheetDescription></SheetDescription>
//         </SheetHeader>

//         <div className="flex flex-col h-full overflow-auto bg-white">
//           {/* Main Content */}
//           <div className="w-full pb-6 px-4">
//             <div>
//               <div>
//                 <div className="">
//                   {wishlists.length === 0 ? (
//                     <div className="h-full w-full mx-auto text-center py-20">
//                       <h4 className="text-lg lg:text-xl font-medium mb-4 text-black">
//                         Your wishlist is empty!
//                       </h4>
//                       <Button asChild className="btn-primary">
//                         <Link href="/products">Continue Shopping</Link>
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="py-6">
//                       {wishlists.map((product, index) => (
//                         <div key={product.id} className="">
//                           <div className="">
//                             <WishlistCard
//                               product={product}
//                               onWishlistRemove={removeItem}
//                               onAddProductToCart={addProductToCart}
//                               onCardClick={handleCardClick}
//                             />
//                           </div>
//                           {index < wishlists.length - 1 && (
//                             <hr className="my-4 border border-primary/10" />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
