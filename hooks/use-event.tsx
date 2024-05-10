import { create } from "zustand";

interface UseEventStore {
  eventId: string;
  setEventId: (id: string) => void;
}

export const useEventId = create<UseEventStore>((set) => ({
  eventId: "",
  setEventId: (id) => set({ eventId: id }),
}));
