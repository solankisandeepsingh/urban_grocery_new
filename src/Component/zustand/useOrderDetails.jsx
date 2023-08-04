import { create } from "zustand";

export const useOrderDetails = create((set) => ({
  allOrderDetails: [],
  orderId :"",
  deliveryAddressData:"",
  setAllOrderDetails: (data) => {
    set(() => ({ allOrderDetails: data }));
  },
  setOrderId: (data) => {
    set(() => ({ orderId: data }));
  },
  setDeliveryAddressData: (data) => {
    set(() => ({ deliveryAddressData: data }));
  },
}));
