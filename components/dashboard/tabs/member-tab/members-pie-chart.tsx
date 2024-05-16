"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemberDashboard } from "@/hooks/use-member-dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

export function MembersPieChart() {
  const membersDashboard = useMemberDashboard();
  const data = {
    labels: ["Absent", "Present"],
    datasets: [
      {
        label: "Member Present vs Absent",
        data: [
          membersDashboard.dashboardInfo.totalAbsentMembers,
          membersDashboard.dashboardInfo.totalAttendances,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
