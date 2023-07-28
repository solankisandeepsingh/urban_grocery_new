import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useApiStore = create(
  persist(
    (set) => ({
      jwt: '',

      setJwt: (data) => {
        set(() => ({ jwt: data }));
      },
    }),
    {
      name: "apiStore",
    }
  )
);
