import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  toggle: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useRegisterModal;
