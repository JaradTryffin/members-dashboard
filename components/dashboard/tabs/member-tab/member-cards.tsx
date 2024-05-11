"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Annoyed, CalendarFold, FileStack, UserRound } from "lucide-react";


export function MemberCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <UserRound />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">435</div>
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
          <div className="text-2xl font-bold">255</div>
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
          <div className="text-2xl font-bold">180</div>
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
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">
            Total number of events for date range
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
