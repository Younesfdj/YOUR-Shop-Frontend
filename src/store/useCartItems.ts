import { create } from "zustand";
import useCartItem from "../hooks/useCartItem";
interface CartItemState {
  cartItems: CartItemI[];
  addToCartItems: (item: CartItemI) => void;
  removeFromCartItems: (item: CartItemI) => void;
  updateCartItems: (item: CartItemI, newItem: CartItemI) => void;
  addProductQuantity: (id: number, quantity: number) => void;
}

const useCartStore = create<CartItemState>((set) => {
  const { updateStorageCartItem, getStorageCartItem } = useCartItem();
  return {
    cartItems: getStorageCartItem(),
    addToCartItems: (item) => {
      return set((state) => {
        let neuCartItem;
        const itemExist = state.cartItems.find(
          (i) => i.ProductId === item.ProductId
        );
        if (itemExist) {
          neuCartItem = state.cartItems.map((i) =>
            i.ProductId === item.ProductId
              ? {
                  ...i,
                  ProductOrderQuantity: i.ProductOrderQuantity + 1,
                }
              : i
          );
        } else neuCartItem = [...state.cartItems, item];
        updateStorageCartItem(neuCartItem);
        return { cartItems: neuCartItem };
      });
    },
    removeFromCartItems: (item) =>
      set((state) => {
        const neuCartItem = state.cartItems.filter(
          (i) => i.ProductId !== item.ProductId
        );

        updateStorageCartItem(neuCartItem);
        return {
          cartItems: neuCartItem,
        };
      }),
    updateCartItems: (item, newItem) =>
      set((state) => {
        const neuCartItem = state.cartItems.map((i) =>
          i.ProductId === item.ProductId ? newItem : i
        );
        updateStorageCartItem(neuCartItem);
        return {
          cartItems: neuCartItem,
        };
      }),
    addProductQuantity: (id, quantity) => {
      set((state) => {
        const neuCartItem = state.cartItems.map((item) =>
          item.ProductId === id
            ? {
                ...item,
                ProductOrderQuantity: quantity,
              }
            : item
        );
        updateStorageCartItem(neuCartItem);
        return {
          cartItems: neuCartItem,
        };
      });
    },
  };
});

export default useCartStore;
