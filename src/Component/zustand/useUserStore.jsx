import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist((set) => ({
    userInfo:  {user_id : 14,
                name: "Login/Signup"},
    deliveryAddress : '',
    addList: [],
    setAddList: (data) => {
      set(() => ({ addList: data }));
    },
    setUserInfo: (data) => {
      set(() => ({ userInfo: data }));
    },
    setDeliveryAddress: (data) => {
      set(() => ({ deliveryAddress: data }));
    },
    resetState: () => {
      set(() => ({ deliveryAddress: '' }));
    },
  }),
  {
    name: "userStore",
  }
  )
);
