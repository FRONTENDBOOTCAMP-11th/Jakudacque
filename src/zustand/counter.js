import { create } from "zustand";

const useCounterState = create((set, get) => ({
  count: 1,

  countUp: step => {
    const newState = { count: get().count + step };
    set(newState);
  },
  countDown: step => {
    // 수량은 1보다 작을 수 없음
    if (get().count !== 1) {
      const newState = { count: get().count - step };
      set(newState);
    }
  },
}));

export default useCounterState;
