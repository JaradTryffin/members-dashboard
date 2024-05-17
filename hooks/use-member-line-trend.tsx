import { create } from "zustand";

// Define the shape of an attendance trend object
interface AttendanceTrend {
  date: string; // ISO 8601 date string
  attendanceTrends: number;
}

// Define the state shape
interface UseAttendanceStore {
  attendanceTrends: AttendanceTrend[];
  addAttendanceTrend: (newTrend: AttendanceTrend) => void;
  setAttendanceTrends: (trends: AttendanceTrend[]) => void;
}

// Create the store
export const useMemberLineTrend = create<UseAttendanceStore>((set) => ({
  attendanceTrends: [], // Initial state

  // Action to add a new attendance trend
  addAttendanceTrend: (newTrend: AttendanceTrend) =>
    set((state) => ({
      attendanceTrends: [...state.attendanceTrends, newTrend],
    })),

  // Action to set multiple attendance trends at once
  setAttendanceTrends: (trends: AttendanceTrend[]) =>
    set(() => ({
      attendanceTrends: trends,
    })),
}));
