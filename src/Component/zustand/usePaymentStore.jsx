import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePaymentStore = create(
  persist(
    (set) => ({
      totalPrice: 0,
      totalMRPPrice: 0,
      totalItems:0,

      setTotalItems: (data) => {
        set(() => ({ totalItems: data }));
      },
      setTotalMRPPrice: (data) => {
        set(() => ({ totalMRPPrice: data }));
      },

      setTotalPrice: (data) => {
        set(() => ({ totalPrice: data }));
      },
    }),
    {
      name: "paymentStore",
    }
  )
);
