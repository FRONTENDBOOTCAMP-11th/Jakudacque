import { create } from "zustand";

const CodeStore = set => ({
  codes: null,
  setCodes: codes => set({ codes }),
  resetCodes: () => set({ codes: null }),
});

const useCodeStore = create(CodeStore);

export default useCodeStore;
