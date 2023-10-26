import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useUserStore } from "./useUserStore";
import { useApiToken } from "./useApiToken";

export const useFavStore = create(
  persist(
    (set) => ({
      allFavItems: [],
      config: {
        headers: {
          Authorization: `Bearer ${useApiToken.getState().apiToken}`,
        },
      },
      bearer: useApiToken.getState().apiToken,
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
      setCartTotal: (data) => {
        set(() => ({ cartTotal: data }));
      },
      setAllFavItems: (data) => {
        set(() => ({ allFavItems: data }));
      },
    }),
    {
      name: "favStore",
    }
  )
);
