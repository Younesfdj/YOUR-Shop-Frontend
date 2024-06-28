import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { BadgeDollarSign } from "lucide-react";
import useCartStore from "../store/useCartItems";

export function CartSummary() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);

  const { cartItems } = useCartStore();

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.ProductPrice * item.ProductOrderQuantity;
    });
    setTotalPrice(Math.round(total * 1000) / 1000);
    setSubTotalPrice(Math.round(total * 1000) / 1000);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Résumé de la commande
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Prix sans livraison</dt>
          <dd className="text-sm font-medium">
            {totalPrice} {"DZD"}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span className="flex gap-1">
              Frais de livraison <BadgeDollarSign className="w-4 h-5" />
            </span>
          </dt>
          <dd className="text-sm font-medium">0 DZD</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Prix total</dt>
          <dd className="text-base font-medium">
            {subTotalPrice} {"DZD"}
          </dd>
        </div>
      </dl>
      <Button
        className="w-full mt-5"
        disabled={cartItems.length > 0 ? false : true}
      >
        Valider la commande
      </Button>
    </section>
  );
}
