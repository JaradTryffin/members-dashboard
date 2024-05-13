"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberTab } from "@/components/dashboard/tabs/member-tab/members-tab";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function DashboardTabs() {
  const params = useParams();

  const fetchDashboardData = async () => {
    const result = await axios.get(
      `/api/entities/${params.entityId}/dashboard`,
    );
    console.log("result", result.data);
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
