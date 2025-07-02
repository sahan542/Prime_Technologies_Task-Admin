import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

type TCartCardProps = {
  item: { product: TProduct; quantity: number };
  onCartQuantityUpdate: (
    currStock: number,
    productId: string,
    quantity: number
  ) => void;
  onCartRemove: (id: string) => void;
};

const CartMobileCard = ({
  item,
  onCartQuantityUpdate,
  onCartRemove,
}: TCartCardProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-3">
        <Image
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
      </div>

      <div className="col-span-9 space-y-2">
        <div className="flex justify-between gap-2">
          <h3 className="text-lg line-clamp-2 text-black"><b>{item.product.name}</b></h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={() => onCartRemove(item.product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between border-b border-[#7b1f4b]/10 pb-2">
          <h4 className="font-medium text-black">Quantity:</h4>
          <div className="flex items-center">
            <Button
              size="icon"
              className="h-8 w-8 hover:bg-[#d4749e] bg-[#7b1f4b]"
              onClick={() => onCartQuantityUpdate(
                              item.quantity,
                              item.product.id,
                              item.quantity - 1
                            )
              }
            >
              <Minus className="h-4 w-4 text-white hover:text-[#7b1f4b]" />
            </Button>
            <span className="w-8 text-center font-medium block text-[#7b1f4b]">
              <b>{item.quantity}</b>
            </span>
            <Button
              size="icon"
              className="h-8 w-8 hover:bg-[#d4749e] bg-[#7b1f4b]"
              onClick={() =>
                onCartQuantityUpdate(
                  item.quantity,
                  item.product.id,
                  item.quantity + 1
                )
              }
            >
              <Plus className="h-4 w-4 text-white hover:text-[#7b1f4b]" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-black">Subtotal:</p>
          <p className="text-[#7b1f4b]">
            Rs {(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartMobileCard;
