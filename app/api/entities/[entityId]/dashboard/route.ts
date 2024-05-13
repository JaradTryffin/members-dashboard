import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { entityId } = params;

    // Fetch total number of members
    const totalMembers = await prismadb.member.count({
      where: {
        entityId: entityId,
      },
    });

    // Fetch total number of attendances for all events
    const attendedMemberIds = new Set(
      (
        await prismadb.attendance.findMany({
          where: {
            event: {
              entity: {
                id: entityId,
              },
            },
          },
          select: {
            memberId: true,
          },
        })
      ).map((attendance) => attendance.memberId),
    );

    const totalAttendances = attendedMemberIds.size;

    const totalEvents = await prismadb.event.count({
      where: {
        entityId: entityId,
      },
    });

    // Calculate total number of absent members
    const totalAbsentMembers = totalMembers * totalEvents - totalAttendances;

    // Fetch total number of events

    return new NextResponse(
      JSON.stringify({
        totalMembers,
        totalAttendances,
        totalAbsentMembers,
        totalEvents,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log("[DASHBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
