"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Attendance, Event } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/members/members-table/members-data-table";
import {
  memberRegisterColumns,
  MemberRegisterTypeColumns,
} from "@/components/attendances/register-columns";
import { useEventId } from "@/hooks/use-event";
import axios from "axios";
import { useRegisteredMemberId } from "@/hooks/use-register-member-id";

interface RegisterProps {
  events: Event[];
  members: MemberRegisterTypeColumns[];
}
export const Register = ({ events, members }: RegisterProps) => {
  const [open, setOpen] = useState(false);
  const eventStore = useEventId();
  const registeredMembers = useRegisteredMemberId();

  const fetchAttendedMembers = async (eventId: string) => {
    const result = await axios.get(`/api/attendance/${eventId}`);
    const filteredMemberIds = result.data.map(
      (member: Attendance) => member.memberId,
    );
    registeredMembers.setMemberRegisteredId(filteredMemberIds);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[400px] justify-between"
          >
            {eventStore.eventId
              ? events.find((event) => event.id === eventStore.eventId)?.name
              : "Select event..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No event found.</CommandEmpty>
            <CommandGroup>
              {events.map((event) => (
                <CommandItem
                  key={event.id}
                  value={event.id}
                  onSelect={async (currentValue) => {
                    fetchAttendedMembers(currentValue).then(() => {
                      eventStore.setEventId(
                        currentValue === eventStore.eventId ? "" : currentValue,
                      );
                      setOpen(false);
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      eventStore.eventId === event.name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {event.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {eventStore.eventId && (
        <DataTable columns={memberRegisterColumns} data={members} />
      )}
    </div>
  );
};
