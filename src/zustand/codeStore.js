import { create } from "zustand";

const CodeStore = set => ({
  codes: null,
  setCodes: codes => set({ codes }),
});

const useCodeStore = create(CodeStore);

export default useCodeStore;
