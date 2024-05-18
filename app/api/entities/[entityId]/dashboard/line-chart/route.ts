import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
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

    //   Fetch events and their attendances
    const events = await prismadb.event.findMany({
      where: {
        entityId: params.entityId,
      },
      include: {
        attendances: {},
      },
    });

    const attendanceTrends = events.map((event) => {
      const presentCount = event.attendances.filter(
        (att) => att.attended,
      ).length;
      const absentCount = event.attendances.filter(
        (att) => !att.attended,
      ).length;
      return {
        date: event.date,
        attendanceTrends: presentCount,
        absentTrends: absentCount,
      };
    });

    return new NextResponse(JSON.stringify(attendanceTrends), {
      status: 200,
    });
  } catch (error) {
    console.log("[ATTENDANCE_TRENDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
