import { create } from "zustand";

const useAddAddressModalState = create((set, get) => ({
  modalIsOpen: false,

  handleModal: () => {
    const newState = { modalIsOpen: !get().modalIsOpen };
    set(newState);
  },
}));

export default useAddAddressModalState;
