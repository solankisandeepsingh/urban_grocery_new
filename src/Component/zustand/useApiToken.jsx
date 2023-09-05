import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../../api/axios";

export const useApiToken = create(
  persist(
    (set) => ({
      apiToken: "",
      accessTokenApi: () => {
        return axios
          .get(
            "https://grocery.intelliatech.in/api-firebase/verify-token.php?generate_token",
            {
              params: {
                key: "generate_token",
              },
            }
          )
          .then((res) => {
            set(() => ({ apiToken: res?.data }));
          })
          .catch((error) => {
            console.log(error, "Api Error");
          });
      },
    }),
    {
      name: "tokenStore",
    }
  )
);
