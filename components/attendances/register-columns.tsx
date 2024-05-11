import { ColumnDef } from "@tanstack/table-core";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterCheckbox } from "@/components/attendances/RegisterCheckBox";

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
      return <RegisterCheckbox row={row} />;
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
