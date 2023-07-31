import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useApiStore = create(
  persist(
    (set) => ({
      jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6dHJ1ZSwiaXNzIjoiZUthcnQiLCJhdWQiOiJlS2FydCBBdXRoZW50aWNhdGlvbiJ9.YCHpGWKM5CCeEiG_Fr38aE67xhndtImMHu7XYam6pXY',

      setJwt: (data) => {
        set(() => ({ jwt: data }));
      },
    }),
    {
      name: "apiStore",
    }
  )
);
