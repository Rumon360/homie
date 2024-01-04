import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  toggle: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useLoginModal;
