import { ColumnDef } from "@tanstack/table-core";
import { Checkbox } from "@/components/ui/checkbox";
import { useEventId } from "@/hooks/use-event";
import axios from "axios";
import toast from "react-hot-toast";
import { useRegisteredMemberId } from "@/hooks/use-register-member-id";

export type MemberRegisterTypeColumns = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
};

export const memberRegisterColumns: ColumnDef<MemberRegisterTypeColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const eventStore = useEventId.getState();
      const registeredMembersIds = useRegisteredMemberId.getState();

      const memberId = row.original.id;

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
      return (
        <Checkbox
          // checked={row.getIsSelected()}
          checked={registeredMembersIds.memberRegisteredId.includes(memberId)}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            // markPresent().catch((error) => console.log(error));
          }}
          aria-label="Select row"
        />
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];
