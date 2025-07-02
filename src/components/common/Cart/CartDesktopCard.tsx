import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

type TCartCardProps = {
  item: { product: TProduct; quantity: number };
  onCartQuantityUpdate: (
    currStock: number,
    productId: string,
    quantity: number
  ) => void;
  onCartRemove: (id: string) => void;
};

const CartDesktopCard = ({
  item,
  onCartQuantityUpdate,
  onCartRemove,
}: TCartCardProps) => {
  return (
    <div className="grid grid-cols-12 items-center gap-3">
      <div className="flex items-center gap-1 col-span-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600"
          onClick={() => onCartRemove(item.product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <Image
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name.slice(0, 6)}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
      </div>

      <div className="flex justify-between gap-2 col-span-6">
        <h3 className=" lg:text-lg line-clamp-2">{item.product.name}</h3>
      </div>

      <div className="flex items-center col-span-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            if (item.quantity - 1 < 1) {
              return toast.error("Quantity cannot be less than 1");
            } else {
              onCartQuantityUpdate(
                item.product.stock,
                item.product.id,
                item.quantity - 1
              );
            }
          }}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium block">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            if (item.product.stock < item.quantity + 1) {
              return toast.error("Not enough stock available");
            } else {
              onCartQuantityUpdate(
                item.product.stock,
                item.product.id,
                item.quantity + 1
              );
            }
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className=" col-span-2">
        ৳ {(item.product.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CartDesktopCard;
