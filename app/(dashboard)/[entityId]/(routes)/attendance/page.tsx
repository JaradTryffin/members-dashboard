import { Heading } from "@/components/ui/heading";

interface AttendancesPageProps {
  params: {
    entityId: string;
  };
}

export default async function AttendancesPage({
  params,
}: AttendancesPageProps) {
  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading
          title="Attendances"
          description="manage attendances for events"
        />
      </div>
    </div>
  );
}
