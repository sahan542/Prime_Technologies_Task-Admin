// import Image from "next/image";
// import { useRouter } from "next/navigation";

// type TCategoryCardProps = {
//   image: string;
//   title: string;
//   itemCount: number;
//   url: string;
// };

// export function CategoryCard({
//   image,
//   title,
//   itemCount,
//   url,
// }: TCategoryCardProps) {
//   const router = useRouter();

//   const handleCategoryClick = () => {
//     router.push(url);
//   };

//   return (
//     <div
//       className="min-w-[180px] bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//       onClick={handleCategoryClick}
//     >
//       <div className="p-2 flex items-center justify-center gap-2">
//         <div className="w-20 h-20 flex-shrink-0">
//           <Image
//             src={image || "/placeholder.svg"}
//             alt={title}
//             width={80}
//             height={80}
//             className="w-full h-full object-contain"
//           />
//         </div>
//         <div>
//           <h3 className="font-medium text-gray-900">{title}</h3>
//           <p className="text-sm text-gray-500">
//             {itemCount} item{itemCount !== 1 ? "s" : ""}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
