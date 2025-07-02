import { TProduct } from "@/types";
import Image from "next/image";

type TSearchProductCardProps = {
  product: TProduct;
  onCardClick: (productSlug: string) => void;
};

const SearchProductCard = ({
  product,
  onCardClick,
}: TSearchProductCardProps) => {
  return (
    <div
      className="grid grid-cols-12 gap-2 items-center cursor-pointer"
      onClick={() => onCardClick(product.slug)}
    >
      <div className="col-span-3">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name.slice(0, 6)}
          width={60}
          height={60}
          className="rounded-md object-cover"
        />
      </div>

      <div className="col-span-9 space-y-2">
        <h3 className="text-sm line-clamp-2 text-gray-700">{product.name}</h3>
        <span className="text-primary font-medium text-sm">
          ৳ {product.price.toFixed(0)}{" "}
          <del className="text-gray-300 ml-[2px] text-base">
            {product.price + 50}{" "}
          </del>
        </span>
      </div>
    </div>
  );
};

export default SearchProductCard;
