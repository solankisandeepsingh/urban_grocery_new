import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useImgStore = create(
  persist(
    (set) => ({
      allImg: {},
      setAllImg: (data) => {
        set(() => ({ allImg: data }));
      },
    }),
    {
      name: "imgStore",
    }
  )
);
