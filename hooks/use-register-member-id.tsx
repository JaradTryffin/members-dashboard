import { create } from "zustand";

interface UseRegisterMemberIdStore {
  memberRegisteredId: string[];
  setMemberRegisteredId: (data: string[]) => void;
}

export const useRegisteredMemberId = create<UseRegisterMemberIdStore>(
  (set) => ({
    memberRegisteredId: [],
    setMemberRegisteredId: (data) => set({ memberRegisteredId: [...data] }),
  }),
);
