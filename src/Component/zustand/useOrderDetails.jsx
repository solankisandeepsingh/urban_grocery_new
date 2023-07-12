import { create } from "zustand";

export const useOrderDetails = create((set) => ({
  allOrderDetails: [],
  setAllOrderDetails: (data) => {
    set(() => ({ allOrderDetails: data }));
  },
}));
