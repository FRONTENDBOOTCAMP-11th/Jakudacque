import { create } from "zustand";

const useAddressModalState = create((set, get) => ({
  modalIsOpen: false,

  handleModal: () => {
    const newState = { modalIsOpen: !get().modalIsOpen };
    set(newState);
  },
}));

export default useAddressModalState;
