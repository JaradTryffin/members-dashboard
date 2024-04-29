import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/members/members-table/members-data-table";
import { eventColumns } from "@/components/event/event-columns";
import { EventSheet } from "@/components/event/event-sheet";
import prismadb from "@/lib/prismadb";
import moment from "moment";

interface EventPageProps {
  params: {
    entityId: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const events = await prismadb.event.findMany({
    where: {
      entityId: params.entityId,
    },
    include: {
      attendances: true,
    },
  });

  const filteredEvents = events.map((event) => {
    return {
      id: event.id,
      name: event.name,
      startTime: moment(event.startTime).format("hh:mm A"),
      endTime: moment(event.endTime).format("hh:mm A"),
      location: event.location,
      date: moment(event.date).format("ddd, MM/DD/YYYY"),
      attendances: event.attendances.length,
    };
  });

  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading title="Event" description="Manage events" />
      </div>
      <Separator />

      <DataTable
        columns={eventColumns}
        data={filteredEvents}
        addUpdateComponent={<EventSheet />}
      />
    </div>
  );
}
