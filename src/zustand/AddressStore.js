import { create } from "zustand";

const useAddressStore = create(set => ({
  addressData: [],

  addAddress: newAddress =>
    set(state => ({ addressData: [...state.addressData, newAddress] })),

  deleteAddress: selectedId =>
    set(state => ({
      addressData: state.addressData.filter(
        e => Number(e.id) !== Number(selectedId),
      ),
    })),

  resetAddress: () => {
    set({ addressData: [] });
  },
}));

export default useAddressStore;
