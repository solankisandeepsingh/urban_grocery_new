import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist((set) => ({
    allCartItems: [],
    setAllCartItems: (data) => {
      set(() => ({ allCartItems: data }));
    },
  }),
  {
    name: "cartStore",
  }
  )
);
