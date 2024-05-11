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
  const markPresent = async () => {
    try {
      await axios.post(`/api/attendance`, {
        memberId,
        eventId: eventStore.eventId,
        attended: true,
      });
      toast.success("Member registered for event");
    } catch (error) {
      toast.error("Failed to register member for event");
    }
  };
  // delete an attendance

  const deleteAttendance = async () => {
    try {
      await axios.delete(`/api/attendance`, {
        data: {
          memberId,
          eventId: eventStore.eventId,
        },
      });
      toast.success("Attendance deleted");
    } catch (error) {
      toast.error("Failed to remove attendance");
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
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          if (value) {
            markPresent().catch((error) => console.log(error));
          } else {
            deleteAttendance().catch((error) => console.log(error));
          }
          fetchAttendedMembers(eventStore.eventId).catch((error) =>
            console.log(error),
          );
        }}
        aria-label="Select row"
      />
    </div>
  );
};
