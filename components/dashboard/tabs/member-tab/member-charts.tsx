"use client";

import { MembersPieChart } from "@/components/dashboard/tabs/member-tab/members-pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberLineTrend } from "@/components/dashboard/tabs/member-tab/member-line-trend";

export function MemberCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 max-h-[600px]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Present vs Absent</CardTitle>
        </CardHeader>
        <CardContent>
          <MembersPieChart />
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-2.5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Trends for events over time
          </CardHeader>
          <CardContent>
            <MemberLineTrend />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Trends for events over time
          </CardHeader>
          <CardContent>
            <MemberLineTrend />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
