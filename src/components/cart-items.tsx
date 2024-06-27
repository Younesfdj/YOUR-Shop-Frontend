import { CartItemsEmpty } from "./cart-items-empty";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getSizeName } from "../lib/utils";
import { Clock, X } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartItems";
import { ChangeEvent } from "react";

export function CartItems() {
  const { cartItems, removeFromCartItems, addProductQuantity } = useCartStore();

  if (cartItems.length === 0) return <CartItemsEmpty />;
  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-500 dark:border-gray-500"
    >
      {cartItems.map((product, productIdx) => (
        <li key={productIdx} className="flex py-6 sm:py-10">
          <div className="shrink-0">
            <img
              width={200}
              height={200}
              src={product.ProductImagePath}
              alt={product.ProductName}
              className="h-24 w-24 rounded-md border-2 border-gray-200 object-cover object-center dark:border-gray-800 sm:h-48 sm:w-48"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative justify-between pr-9 sm:flex sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <Link
                      to={`/products/${product.ProductId}`}
                      className="font-medium"
                    >
                      {product.ProductName}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium">
                  {product.ProductPrice} DZD
                </p>
                <p className="mt-1 text-sm font-medium">
                  Size:
                  <strong>{getSizeName(product.ProductSize)}</strong>
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  Quantity, {product.ProductName}
                </label>
                <Input
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={product.ProductMaxQuantity}
                  value={product.ProductOrderQuantity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    addProductQuantity(
                      product.ProductId,
                      parseInt(e.target.value)
                    )
                  }
                />
                <div className="absolute right-0 top-0">
                  <Button
                    variant="ghost"
                    type="button"
                    className="-mr-2 inline-flex p-2"
                    onClick={() => removeFromCartItems(product)}
                  >
                    <span className="sr-only">Remove</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-4 flex space-x-2 text-sm">
              <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Livraison en 48h</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
