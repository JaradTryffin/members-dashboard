"use client";
import { ColumnDef } from "@tanstack/table-core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSheet } from "@/hooks/use-sheet";
import { useStoreMember } from "@/hooks/use-member";

export type MemberColumns = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  joined: Date;
};

const sheet = useSheet.getState();
const memberStore = useStoreMember.getState();

export const membersColumns: ColumnDef<MemberColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select-all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-2 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },

  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joined"));
      const formatted = date.toLocaleDateString("en-US");

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(member.id)}
            >
              Copy member id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                sheet.onOpen();
                memberStore.setMember({
                  id: member.id,
                  firstName: member.firstName,
                  lastName: member.lastName,
                  address: member.address,
                  contact: member.contact,
                });
              }}
            >
              Edit Member
            </DropdownMenuItem>
            <DropdownMenuItem>Send Message</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
