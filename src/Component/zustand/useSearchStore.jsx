import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchInput: '',
  setSearchInput: (data) => {
    set(() => ({ searchInput: data }));
  },
}));
