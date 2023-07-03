import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist((set) => ({
    userInfo:  {user_id : 14,
                name: "Login/Signup"},
    // initialUser : {user_id : 14,
    //               name: "Login/Signup"},
    setUserInfo: (data) => {
      set(() => ({ userInfo: data }));
    },
  }),
  {
    name: "userStore",
  }
  )
);
