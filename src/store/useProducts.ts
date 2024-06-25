import { create } from "zustand";

interface ProductsState {
  products: ProductI[];
  addProducts: (products: ProductI[]) => void;
  updateProducts: (callback: (products: ProductI[]) => ProductI[]) => void;
  deleteProducts: (products: ProductI[]) => void;
}

const useProductStore = create<ProductsState>((set) => ({
  products: [],
  addProducts: (products) => set({ products }),
  updateProducts: (callback) =>
    set((state) => ({ products: callback(state.products) })),
  deleteProducts: (products) => set({ products }),
}));

export default useProductStore;
