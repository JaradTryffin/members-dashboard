"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Annoyed, CalendarFold, FileStack, UserRound } from "lucide-react";
import { useMemberDashboard } from "@/hooks/use-member-dashboard";

export function MemberCards() {
  const membersDashboard = useMemberDashboard();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <UserRound />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {membersDashboard.dashboardInfo.totalMembers}
          </div>
          <p className="text-xs text-muted-foreground">
            Total number of members in organisation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Present</CardTitle>
          <FileStack />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {membersDashboard.dashboardInfo.totalAttendances}
          </div>
          <p className="text-xs text-muted-foreground">
            Total number of members present for date range
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Absent</CardTitle>
          <Annoyed />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {membersDashboard.dashboardInfo.totalAbsentMembers}
          </div>
          <p className="text-xs text-muted-foreground">
            Total number of members absent for date range
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Events</CardTitle>
          <CalendarFold />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {membersDashboard.dashboardInfo.totalEvents}
          </div>
          <p className="text-xs text-muted-foreground">
            Total number of events for date range
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
