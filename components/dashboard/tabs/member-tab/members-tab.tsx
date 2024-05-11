"use client";

import { MemberCards } from "@/components/dashboard/tabs/member-tab/member-cards";
import { MembersPieChart } from "@/components/dashboard/tabs/member-tab/members-pie-chart";
import { MemberCharts } from "@/components/dashboard/tabs/member-tab/member-charts";

export function MemberTab() {
  return (
    <div>
      <MemberCards />
      <div className="mt-5">
        <MemberCharts />
      </div>
    </div>
  );
}
