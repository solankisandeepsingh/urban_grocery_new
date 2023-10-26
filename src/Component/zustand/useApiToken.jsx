import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useApiToken = create(
  persist(
    (set) => ({
      apiToken: "",
      setApiToken: (token) => {
        set({ apiToken: token });
      },
    }),
    {
      name: "tokenStore",
    }
  )
);


