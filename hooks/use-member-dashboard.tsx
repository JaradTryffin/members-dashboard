import { DashboardCards } from "@/types/dashboard-card.types";
import { create } from "zustand";

interface UseMemberDashboard {
  dashboardInfo: DashboardCards;
  setDashboardInfo: (data: DashboardCards) => void;
}

export const useMemberDashboard = create<UseMemberDashboard>((set) => ({
  dashboardInfo: {
    totalMembers: 0,
    totalAttendances: 0,
    totalAbsentMembers: 0,
    totalEvents: 0,
  },
  setDashboardInfo: (data) => set({ dashboardInfo: { ...data } }),
}));
