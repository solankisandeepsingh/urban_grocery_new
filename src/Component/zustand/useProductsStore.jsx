import { create } from "zustand";

export const useProductsStore = create((set) => ({
  allProducts: [],
  allCategories : [],
  setAllProducts: (data) => {
    set(() => ({ allProducts: data }));
  },
  setAllCategories: (data) => {
    set(() => ({ allCategories: data }));
  }
}));
