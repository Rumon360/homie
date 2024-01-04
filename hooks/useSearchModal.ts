import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  toggle: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSearchModal;
