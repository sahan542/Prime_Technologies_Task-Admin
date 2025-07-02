// "use client";

// import Container from "@/components/shared/Ui/Container";
// import SectionTitle from "@/components/shared/Ui/SectionTitle";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useRef, useState } from "react";
// import { CategoryCard } from "./CategoryCard";

// export default function Categories() {
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

//   const sliderRef = useRef<HTMLDivElement>(null);

//   const scrollAmount = 300;

//   const handleScroll = () => {
//     if (!sliderRef.current) return;

//     const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//     setShowLeftArrow(scrollLeft > 0);
//     setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//   };

//   const scroll = (direction: "left" | "right") => {
//     if (!sliderRef.current) return;

//     const { scrollLeft } = sliderRef.current;
//     const newScrollLeft =
//       direction === "left"
//         ? scrollLeft - scrollAmount
//         : scrollLeft + scrollAmount;

//     sliderRef.current.scrollTo({
//       left: newScrollLeft,
//       behavior: "smooth",
//     });
//   };

//   const categories = [
//     { title: "Apple", itemCount: 10, url: "/products?category=apple" },
//     { title: "Samsung", itemCount: 2, url: "/products?category=samsung" },
//     { title: "OnePlus", itemCount: 2, url: "/products?category=oneplus" },
//     { title: "Oppo", itemCount: 2, url: "/products?category=oppo" },
//     { title: "Vivo", itemCount: 2, url: "/products?category=vivo" },
//     { title: "Xiaomi", itemCount: 2, url: "/products?category=xiaomi" },
//     { title: "Realme", itemCount: 2, url: "/products?category=realme" },
//     { title: "Huawei", itemCount: 2, url: "/products?category=huawei" },
//   ];

//   const imageUrl = "https://i.ibb.co/gM3VW4cn/iphone-category.png";

//   return (
//     <Container className="py-16">
//       <div className="">
//         <div className="flex items-center mb-6">
//           <SectionTitle text="Popular Categories" />
//         </div>

//         <div className="relative">
//           {showLeftArrow && (
//             <Button
//               variant="outline"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md h-8 w-8 rounded-full border-gray-200 cursor-pointer"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-6 w-6" />
//               <span className="sr-only">Scroll left</span>
//             </Button>
//           )}

//           <div
//             ref={sliderRef}
//             className="flex overflow-x-auto scrollbar-hide gap-2"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             onScroll={handleScroll}
//           >
//             {categories.map((category, index) => (
//               <CategoryCard
//                 key={index}
//                 image={imageUrl}
//                 title={category.title}
//                 itemCount={category.itemCount}
//                 url={category.url}
//               />
//             ))}
//           </div>

//           {showRightArrow && (
//             <Button
//               variant="outline"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md h-8 w-8 rounded-full border-gray-200 cursor-pointer"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-6 w-6" />
//               <span className="sr-only">Scroll right</span>
//             </Button>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// }
