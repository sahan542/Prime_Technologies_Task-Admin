// "use client";

// import Container from "@/components/shared/Ui/Container";
// import SectionTitle from "@/components/shared/Ui/SectionTitle";
// import { useGetProductsQuery } from "@/redux/api/productApi";
// import { TProduct } from "@/types";
// import { ProductCard } from "../../Products/ProductCard";
// import ProductCardSkeleton from "../../Products/ProductCardSkeleton";

// const Products = ({
//   queryString,
//   sectionName,
// }: {
//   queryString?: string;
//   sectionName: string;
// }) => {
//   const query: Record<string, any> = {};

//   if (queryString) {
//     query["sort"] = queryString;
//   }

//   // RTK Query hook
//   const { data: productsData, isLoading: isProductsLoading } =
//     useGetProductsQuery(query);

//   return (
//     <Container className="py-16">
//       <div className="flex items-center mb-6">
//         <SectionTitle text={sectionName} />
//       </div>

//       <div>
//         {isProductsLoading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//             {[...Array(6)].map((_, index) => (
//               <ProductCardSkeleton key={index} />
//             ))}
//           </div>
//         ) : (
//           <div>
//             {productsData.data.data.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//                 {productsData.data.data.slice(0, 6).map((product: TProduct) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex justify-center items-center py-10">
//                 <h4 className="text-xl md:text-2xl font-medium">
//                   No Product Found!
//                 </h4>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Products;
