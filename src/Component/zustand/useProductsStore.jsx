import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductsStore = create(
  persist(
    (set) => ({
      allProducts: [],
      allCategories: [],
      setAllProducts: (data) => {
        set(() => ({ allProducts: data }));
      },
      setAllCategories: (data) => {
        set(() => ({ allCategories: data }));
      },
    }),
    {
      name: "allProductsStore",
    }
  )
);

// create((set) => ({
//   allProducts: [],
//   allCategories : [],
//   setAllProducts: (data) => {
//     set(() => ({ allProducts: data }));
//   },
//   setAllCategories: (data) => {
//     set(() => ({ allCategories: data }));
//   }
// }));
