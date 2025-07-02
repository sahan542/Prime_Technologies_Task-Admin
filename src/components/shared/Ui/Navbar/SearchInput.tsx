// import { Input } from "@/components/ui/input";
// // import useDebounced from "@/hooks/useDebounced";
// import { useGetProductsQuery } from "@/redux/api/productApi";
// import { TProduct } from "@/types";
// import { AnimatePresence, motion } from "framer-motion";
// import { Search, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { LoaderSpinner } from "../LoaderSpinner";
// import SearchProductCard from "./SearchProductCard";

// export default function SearchInput() {
//   const [readOnly, setReadOnly] = useState(true);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const router = useRouter();

//   // const debouncedSearchTerm = useDebounced(searchTerm, 600);

//   const query: Record<string, any> = {};

//   if (debouncedSearchTerm) {
//     query["searchTerm"] = debouncedSearchTerm;
//   }

//   // RTK Query hook
//   const { data: productsData, isLoading: isProductsLoading } =
//     useGetProductsQuery(query, {
//       skip: !query.searchTerm,
//     });

//   // handle clear
//   const handleClear = () => {
//     setSearchTerm("");
//     inputRef.current?.focus();
//   };

//   // Detect typing
//   useEffect(() => {
//     if (searchTerm !== debouncedSearchTerm) {
//       setIsTyping(true); // User is typing
//     } else {
//       setIsTyping(false); // Debounce settled
//     }
//   }, [searchTerm, debouncedSearchTerm]);

//   const isLoading = isTyping || isProductsLoading;

//   // handle card click to navigate product details page
//   const handleCardClick = (productSlug: string) => {
//     router.push(`/products/${productSlug}`);
//     setSearchTerm("");
//   };

//   return (
//     <div className="relative w-full lg:w-[300px]">
//       <Input
//         ref={inputRef}
//         readOnly={readOnly}
//         type="text" // ✅ use text instead of "search" to avoid native ✕
//         placeholder="Search products..."
//         value={searchTerm}
//         onClick={() => setReadOnly(false)}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full pl-9 border-0 bg-white/10 text-white placeholder:text-white/70 focus:ring-white"
//       />
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

//       {/* Clear icon button */}
//       {searchTerm && (
//         <button
//           type="button"
//           onClick={handleClear}
//           className="absolute right-3 top-3 z-10 text-muted-foreground cursor-pointer text-gray-200"
//         >
//           <X className="h-3 w-3" />
//         </button>
//       )}

//       {/* products show */}
//       <AnimatePresence>
//         {searchTerm && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//             className="absolute top-10 left-0 max-h-[300px] overflow-auto bg-white w-full shadow-md rounded-md p-4 space-y-3 z-50"
//           >
//             {isLoading ? (
//               <div className="text-center py-2">
//                 <LoaderSpinner />
//                 <p className="text-center text-lg font-medium text-muted-foreground animate-pulse text-gray-500">
//                   Loading...
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {productsData?.data?.data?.length > 0 ? (
//                   <div className="">
//                     {productsData?.data?.data.map(
//                       (product: TProduct, index: number) => (
//                         <div key={product._id}>
//                           <SearchProductCard
//                             product={product}
//                             onCardClick={handleCardClick}
//                           />
//                           {index < productsData?.data?.data?.length - 1 && (
//                             <hr className="my-4 border border-primary/10" />
//                           )}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center text-gray-500 py-2">
//                     <h2 className="text-lg font-medium">No products found!</h2>
//                     <p className="text-sm">Try a different keyword.</p>
//                   </div>
//                 )}
//               </>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
