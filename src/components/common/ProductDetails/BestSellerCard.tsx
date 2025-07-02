import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function BestSellerCard({ product }: { product: TProduct }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex items-center p-3 hover:bg-gray-50 transition-colors"
    >
      <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded overflow-hidden flex-shrink-0">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="ml-3 flex-1">
        <div className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </div>
        <p className="text-sm font-bold text-primary mt-1">৳{product.price}</p>
      </div>
    </Link>
  );
}
