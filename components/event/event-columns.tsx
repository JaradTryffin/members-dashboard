import { ColumnDef } from "@tanstack/table-core";

export type EventColumns = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  attendances?: number;
};

export const eventColumns: ColumnDef<EventColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "attendances",
    header: "Attendance",
  },
];
