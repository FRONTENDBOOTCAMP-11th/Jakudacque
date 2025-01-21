import { create } from "zustand";

const useAddressModalState = create(set => ({
  modalIsOpen: false,
  handleModal: () => set(state => ({ modalIsOpen: !state.modalIsOpen })),
  selectedAddress: null, // 선택된 주소 저장
  setSelectedAddress: address => set({ selectedAddress: address }),
}));

export default useAddressModalState;
