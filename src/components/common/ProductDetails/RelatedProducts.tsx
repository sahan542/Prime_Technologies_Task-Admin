import { useGetProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/types";
import { ProductCard } from "../Products/ProductCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const RelatedProducts = ({ tags }: { tags: string[] }) => {
  const query = {
    tags: tags.join(","),
  };

  const { data: products, isLoading: isProductLoading } = useGetProductsQuery(
    query,
    {
      refetchOnMountOrArgChange: true,
      skip: tags.length === 0,
    }
  );

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div>
        {isProductLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.data.data.slice(0, 4).map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
