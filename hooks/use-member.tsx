import { create } from "zustand";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
}
interface UseMemberStore {
  member: Member;
  setMember: (data: Member) => void;
}

export const useStoreMember = create<UseMemberStore>((set) => ({
  member: {
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
  },
  setMember: (data) => set({ member: { ...data } }),
}));
