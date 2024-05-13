"use client";

import { Row } from "@tanstack/table-core";
import { MemberRegisterTypeColumns } from "@/components/attendances/register-columns";
import { Checkbox } from "@/components/ui/checkbox";
import { useEventId } from "@/hooks/use-event";
import { useRegisteredMemberId } from "@/hooks/use-register-member-id";
import axios from "axios";
import toast from "react-hot-toast";
import { Attendance } from "@prisma/client";

interface RegisterCheckBoxProps {
  row: Row<MemberRegisterTypeColumns>;
}

export const RegisterCheckbox = ({ row }: RegisterCheckBoxProps) => {
  const eventStore = useEventId();
  const registeredMembersIds = useRegisteredMemberId();
  const memberId = row.original.id;

  // mark users present
  const markRegister = async (attended: boolean) => {
    try {
      await axios.patch(`/api/attendance`, {
        memberId,
        eventId: eventStore.eventId,
        attended: attended,
      });
      toast.success("Member registered for event");
    } catch (error) {
      toast.error("Failed to register member for event");
    }
  };

  // after marking present or removing record of present update ui

  const fetchAttendedMembers = async (eventId: string) => {
    const result = await axios.get(`/api/attendance/${eventId}`);
    const filteredMemberIds = result.data.map(
      (member: Attendance) => member.memberId,
    );
    registeredMembersIds.setMemberRegisteredId(filteredMemberIds);
  };

  return (
    <div>
      <Checkbox
        checked={registeredMembersIds.memberRegisteredId.includes(memberId)}
        onCheckedChange={async (value) => {
          row.toggleSelected(!!value);
          if (value) {
            await markRegister(true).catch((error) => console.log(error));
          } else {
            await markRegister(false).catch((error) => console.log(error));
          }
          await fetchAttendedMembers(eventStore.eventId).catch((error) =>
            console.log(error),
          );
        }}
        aria-label="Select row"
      />
    </div>
  );
};
