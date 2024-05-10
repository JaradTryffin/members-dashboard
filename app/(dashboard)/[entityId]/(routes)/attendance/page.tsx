import { Heading } from "@/components/ui/heading";
import { Register } from "@/components/attendances/register";
import prismadb from "@/lib/prismadb";

interface AttendancesPageProps {
  params: {
    entityId: string;
  };
}

export default async function AttendancesPage({
  params,
}: AttendancesPageProps) {
  const events = await prismadb.event.findMany({
    where: {
      entityId: params.entityId,
    },
  });

  const members = await prismadb.member.findMany({
    where: {
      entityId: params.entityId,
    },
  });

  const filteredMembersData = members.map((member) => {
    return {
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      address: member.address,
    };
  });
  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading
          title="Attendances"
          description="manage attendances for events"
        />
      </div>
      <Register events={events} members={filteredMembersData} />
    </div>
  );
}
