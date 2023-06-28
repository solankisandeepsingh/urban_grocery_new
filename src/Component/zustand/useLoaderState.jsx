import { create } from "zustand";

export const useLoaderState = create((set) => ({
  isLoading: false,
  setisLoading: (data) => {
    set(() => ({ isLoading: data }));
  }
}));
