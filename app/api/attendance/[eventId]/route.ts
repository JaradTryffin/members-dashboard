import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const attendances = await prismadb.attendance.findMany({
      where: {
        eventId: params.eventId,
      },
    });

    return NextResponse.json(attendances);
  } catch (error) {
    console.log("[ATTENDANCE_EVENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
