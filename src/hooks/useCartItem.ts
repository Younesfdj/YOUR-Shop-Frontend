export default function useCartItem() {
  function getStorageCartItem(): CartItemI[] {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  }

  function updateStorageCartItem(cartItems: CartItemI[]) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  return { getStorageCartItem, updateStorageCartItem };
}
