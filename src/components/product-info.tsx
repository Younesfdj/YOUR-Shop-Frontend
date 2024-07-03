import { Button } from "./ui/button";
import { getSizeName } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../store/useCartItems";

interface Props {
  product: ProductI;
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(
    product.ProductSizes?.split("-")[0]
  );
  const { addToCartItems } = useCartStore();
  const navigate = useNavigate();
  const onAddToCart = () => {
    const item = {
      ProductId: product.ProductId,
      ProductName: product.ProductName,
      ProductPrice: product.ProductPrice,
      ProductImagePath: product.ProductGallery[0]?.ProductImagePath,
      ProductOrderQuantity: 1,
      ProductMaxQuantity: product.ProductQuantity,
      ProductSize: selectedSize,
    };
    addToCartItems(item);
    navigate("/cart");
  };

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">
        {product.ProductName}
      </h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">{product.ProductPrice} DZD</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.ProductDesc}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectedSize)}</strong>
        </p>
        {product.ProductSizes?.split("-").map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="mr-2 mt-4"
            onClick={() => setSelectedSize(size)}
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            onClick={onAddToCart}
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            disabled={product.ProductQuantity === 0}
          >
            {product.ProductQuantity === 0 ? "Rupture de stock" : "Add to cart"}
          </Button>
        </div>
      </form>
    </div>
  );
}
