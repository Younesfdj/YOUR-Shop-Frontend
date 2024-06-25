import { create } from "zustand";

interface CartItemState {
  cartItems: CartItemI[];
  addToCartItems: (item: CartItemI) => void;
  removeFromCartItems: (item: CartItemI) => void;
  updateCartItems: (item: CartItemI, newItem: CartItemI) => void;
}

const useCartStore = create<CartItemState>((set) => ({
  cartItems: [],
  addToCartItems: (item) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeFromCartItems: (item) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.ProductId !== item.ProductId),
    })),
  updateCartItems: (item, newItem) =>
    set((state) => ({
      cartItems: state.cartItems.map((i) =>
        i.ProductId === item.ProductId ? newItem : i
      ),
    })),
}));

export default useCartStore;
