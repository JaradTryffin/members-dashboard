import { membersColumns } from "@/components/members/members-table/members-columns";
import axios from "axios";
import prismadb from "@/lib/prismadb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/members/members-table/members-data-table";
import { MemberSheet } from "@/components/members/members-sheet/members-sheet";

interface MembersPageProps {
  params: {
    entityId: string;
  };
}

export default async function MembersPage({ params }: MembersPageProps) {
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
      contact: member.contact,
      joined: member.createdAt,
    };
  });

  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading title="Members" description="Manage entity members" />
      </div>
      <Separator />

      <DataTable
        columns={membersColumns}
        data={filteredMembersData}
        addUpdateComponent={<MemberSheet />}
      />
    </div>
  );
}
