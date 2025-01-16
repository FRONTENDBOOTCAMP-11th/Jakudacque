import { create } from "zustand";

const useModalState = create((set, get) => ({
  modalIsOpen: false,

  handleModal: () => {
    const newState = { modalIsOpen: !get().modalIsOpen };
    set(newState);
  },
}));

export default useModalState;
