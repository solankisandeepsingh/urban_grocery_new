import { create } from "zustand";

export const useSearchStore = create((set) => ({
  allSearchData: [],
  setAllSearchData: (data) => {
    set(() => ({ allSearchData: data }));
  },
}));
