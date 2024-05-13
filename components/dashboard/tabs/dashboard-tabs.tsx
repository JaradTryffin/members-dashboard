"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberTab } from "@/components/dashboard/tabs/member-tab/members-tab";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardCards } from "@/types/dashboard-card.types";
import { useMemberDashboard } from "@/hooks/use-member-dashboard";

export function DashboardTabs() {
  const params = useParams();
  const membersDashboard = useMemberDashboard();

  const fetchDashboardData = async () => {
    const result = await axios.get(
      `/api/entities/${params.entityId}/dashboard`,
    );
    membersDashboard.setDashboardInfo(result.data);
  };

  useEffect(() => {
    fetchDashboardData().catch((error) => console.log(error));
  }, []);
  return (
    <Tabs defaultValue="members" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
      </TabsList>

      <TabsContent value="members">
        <MemberTab />
      </TabsContent>
      <TabsContent value="revenue">
        <h1>Revenue</h1>
      </TabsContent>
    </Tabs>
  );
}
