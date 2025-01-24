import { create } from "zustand";

const CodeStore = set => ({
  codes: null,
  setCodes: codes => {
    let codeMap = {};

    for (let code in codes) {
      codeMap[code] = {};
      codes[code].codes.forEach(element => {
        codeMap[code][element.code] = element.value;
      });
    }

    set({ codes: codeMap });
  },
  resetCodes: () => set({ codes: null }),
  updateCode: (category, updated) => {
    set(state => {
      const newCodes = { ...state.codes, [category]: updated };
      return { codes: newCodes };
    });
  },
});

const useCodeStore = create(CodeStore);

export default useCodeStore;
