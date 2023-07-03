import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
// import { useUserStore } from "./useUserStore";

export const useImgStore = create(
  persist((set) => ({
    allImg: {},
    // bodyFormData : () => {
    //   let bodyFormdata = new FormData();
    //   bodyFormdata.append("accesskey", "90336");
    //   bodyFormdata.append("remove_from_cart", "1");
    //   bodyFormdata.append("user_id", useUserStore.getState().userInfo.user_id);
    //   return bodyFormdata
    // },

    setAllImg: (data) => {
      set(() => ({ allImg: data }));
    },
    // clearCartApi: () => {
    //   // set({ isLoading: true, error: null });

    //   axios
    //   .post(
    //     "https://grocery.intelliatech.in/api-firebase/cart.php",
    //     useCartStore.getState().bodyFormData(),
    //     useCartStore.getState().config
    //   )
    //   .then((res) => {
    //     console.log(res, 'CART CLEAR RESPONSE ZUSTAND[[[[[[[[[[[[]]]]]]]]]]]]')
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  }),
  {
    name: "imgStore",
  }
  )
);
