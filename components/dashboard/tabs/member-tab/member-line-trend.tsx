"use client";
import { useMemberLineTrend } from "@/hooks/use-member-line-trend";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const MemberLineTrend = () => {
  const memberLineTrend = useMemberLineTrend();

  const labels = memberLineTrend.attendanceTrends.map((event) =>
    new Date(event.date).toLocaleDateString(),
  );

  const attendances = memberLineTrend.attendanceTrends.map(
    (event) => event.attendanceTrends,
  );
  const absent = memberLineTrend.attendanceTrends.map(
    (event) => event.absentTrends,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Number present",
        data: attendances,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Number absent",
        data: absent,
        fill: false,
        backgroundColor: "rgba(255,99,132,1)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};
