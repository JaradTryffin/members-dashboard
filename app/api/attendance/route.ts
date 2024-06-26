import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { memberId, eventId, attended } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!memberId || !eventId || !attended) {
      return new NextResponse("Missed info in body", { status: 400 });
    }

    const attendance = await prismadb.attendance.create({
      data: {
        memberId: memberId,
        eventId: eventId,
        attended: attended,
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.log("[ATTENDANCE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { memberId, eventId, attended } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (attended === undefined || attended === null) {
      return new NextResponse("Invalid attended value", { status: 400 });
    }

    const existingAttendance = await prismadb.attendance.findFirst({
      where: {
        memberId: memberId,
        eventId: eventId,
      },
    });

    if (!existingAttendance) {
      return new NextResponse("Attendance record not found", { status: 404 });
    }

    //   Update the attended field of the attendance record
    const updatedAttendance = await prismadb.attendance.update({
      where: { id: existingAttendance.id },
      data: { attended: attended },
    });

    return new NextResponse("Attendance updated successfully", { status: 200 });
  } catch (error) {
    console.log("[ATTENDANCES_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { eventId, memberId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const attendance = await prismadb.attendance.findFirst({
      where: {
        memberId: memberId,
        eventId: eventId,
      },
    });

    if (attendance) {
      await prismadb.attendance.delete({
        where: {
          id: attendance.id,
        },
      });
      return new NextResponse("Attendance deleted successfully", {
        status: 200,
      });
    } else {
      return new NextResponse("Attendance not found", { status: 404 });
    }
  } catch (error) {
    console.log("[ATTENDANCE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
