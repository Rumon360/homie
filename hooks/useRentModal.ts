import { create } from "zustand";

interface RentModalStore {
  isOpen: boolean;
  toggle: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useRentModal;
