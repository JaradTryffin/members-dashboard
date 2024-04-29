import { create } from "zustand";

interface useSheetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSheet = create<useSheetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useEventSheet = create<useSheetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
