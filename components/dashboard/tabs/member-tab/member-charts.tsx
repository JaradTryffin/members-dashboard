"use client";

import { MembersPieChart } from "@/components/dashboard/tabs/member-tab/members-pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MemberCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Present vs Absent</CardTitle>
        </CardHeader>
        <CardContent>
          <MembersPieChart />
        </CardContent>
      </Card>
    </div>
  );
}
