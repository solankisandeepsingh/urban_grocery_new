import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderDetails = create(
  persist(
    (set) => ({
      allOrderDetails: [],
      orderId :"",

      setAllOrderDetails: (data) => {
        set(() => ({ allOrderDetails: data }));
      },
      setOrderId: (data) => {
        set(() => ({ orderId: data }));
      },
    }),
    {
      name: "OrderDetailstStore",
    }
  )
);
















create((set) => ({
  allOrderDetails: [],
  orderId :"",
  setAllOrderDetails: (data) => {
    set(() => ({ allOrderDetails: data }));
  },
  setOrderId: (data) => {
    set(() => ({ orderId: data }));
  },
}));
