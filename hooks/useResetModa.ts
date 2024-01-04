import { create } from "zustand";

interface ResetModalStore {
  isOpen: boolean;
  toggle: () => void;
}

const useResetModal = create<ResetModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useResetModal;
