import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useWishState = create(
  persist(
    (set, get) => ({
      wish: false,

      handleWish: () => {
        const newState = { wish: !get().wish };
        set(newState);
        console.log(newState);
        return newState.wish;
      },
    }),
    {
      name: "wish-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useWishState;
