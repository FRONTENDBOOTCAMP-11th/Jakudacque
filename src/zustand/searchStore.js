import { create } from 'zustand';

const useSearchStore = create((set) => ({
  keyword: '',
  setKeyword: (newKeyword) => set({ keyword: newKeyword }),
}));

export default useSearchStore;