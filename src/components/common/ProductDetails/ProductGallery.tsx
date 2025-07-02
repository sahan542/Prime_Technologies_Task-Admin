import { cn } from "@/lib/utils";
import { TProduct } from "@/types";
import Image from "next/image";
import { useState } from "react";

const ProductGallery = ({ singleProduct }: { singleProduct: TProduct }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [singleProduct.image, ...singleProduct.images];

  return (
    <>
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <Image
          src={galleryImages[selectedImage] || "/placeholder.svg"}
          alt={singleProduct.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {galleryImages.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer",
              selectedImage === index ? "border-primary" : "border-gray-200"
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${singleProduct.name} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductGallery;
