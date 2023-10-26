import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useUserStore } from "./useUserStore";
import axiosInstance from "../../api/axiosInstance";
import { useApiToken } from "./useApiToken";

export const useCartStore = create(
  persist(
    (set) => ({
      allCartItems: [],
      variant: { 0: 0 },
      config: {
        headers: {
          Authorization: `Bearer ${useApiToken.getState().apiToken}`,
        },
      },
      bearer: `${useUserStore.getState().userInfo.user_id}`,
      cartTotal: 0,
      bodyFormData: () => {
        let bodyFormdata = new FormData();
        bodyFormdata.append("accesskey", "90336");
        bodyFormdata.append("remove_from_cart", "1");
        bodyFormdata.append(
          "user_id",
          useUserStore.getState().userInfo.user_id
        );
        return bodyFormdata;
      },
      setVariant: (data) => {
        set(() => ({ variant: data }));
      },
      setCartTotal: (data) => {
        set(() => ({ cartTotal: data }));
      },
      setAllCartItems: (data) => {
        set(() => ({ allCartItems: data }));
      },
      clearCartApi: () => {

        axiosInstance
          .post(
            "/cart.php",
            useCartStore.getState().bodyFormData(),
            useCartStore.getState().config
          )
          .then((res) => {
            console.log(
              res,
              "CART CLEAR RESPONSE ZUSTAND[[[[[[[[[[[[]]]]]]]]]]]]"
            );
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),

    {
      name: "cartStore",
    }
  )
);
