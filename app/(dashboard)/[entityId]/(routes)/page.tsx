import prismadb from "@/lib/prismadb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";
import { DashboardTabs } from "@/components/dashboard/tabs/dashboard-tabs";

interface DashboardPageProps {
  params: { entityId: string };
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const entity = await prismadb.entity.findFirst({
    where: {
      id: params.entityId,
    },
  });
  return (
    <div className="m-5">
      <div className="flex w-full justify-between mb-5">
        <Heading
          title="Dasboard"
          description={`View stats on ${entity?.name}`}
        />
        <CalendarDateRangePicker />
      </div>
      <Separator />
      <div className="mt-5">
        <DashboardTabs />
      </div>
    </div>
  );
};

export default DashboardPage;
