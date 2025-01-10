import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useWishState = create(
  persist(
    (set, get) => ({
      wish: {},

      // 상태 토글
      toggleWish: productId => {
        const existWish = get().wish;
        const newWish = {
          ...existWish,
          [productId]: !existWish[productId],
        };
        const newState = { wish: newWish };
        set(newState);
        console.log(newState);
      },

      // 특정 상품의 찜 상태 조회
      isWished: productId => {
        return !!get().wish[productId]; // 찜 상태 반환 (undefined일 경우 false)
      },

      // 상태 불러오기 (로그인 시 사용)
      restoreWishState: products => {
        let newWish = {};
        products.forEach(e => {
          newWish[e] = true;
        });
        set({ wish: newWish });
      },

      // 상태 초기화 (로그아웃 시 사용)
      resetWishState: () => {
        localStorage.removeItem("wish-storage");
      },
    }),
    {
      name: "wish-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useWishState;
