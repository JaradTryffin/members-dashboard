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
        attendances: {
          where: {
            attended: true,
          },
        },
      },
    });

    const attendanceTrends = events.map((event) => {
      return {
        date: event.date,
        attendanceTrends: event.attendances.length,
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
