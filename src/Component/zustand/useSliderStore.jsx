import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useSliderStore = create(
    persist(
      (set) => ({
        allCarouselImg:[],
  
        setAllCarouselImg: (data) => {
          set(() => ({ allCarouselImg: data }));
        },
      }),
      {
        name: "CarouselImgStore",
      }
    )
  );
