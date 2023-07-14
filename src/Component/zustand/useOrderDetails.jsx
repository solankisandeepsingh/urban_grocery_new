import { create } from "zustand";

export const useOrderDetails = create((set) => ({
  allOrderDetails: [],
  orderId :"",
  setAllOrderDetails: (data) => {
    set(() => ({ allOrderDetails: data }));
  },
  setOrderId: (data) => {
    set(() => ({ orderId: data }));
  },
}));
