import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, startTime, endTime, location, date } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const event = await prismadb.event.create({
      data: {
        name: name,
        startTime: startTime,
        endTime: endTime,
        location: location,
        date: date,
        entityId: params.entityId,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.log("[EVENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const events = await prismadb.event.findMany({
      where: {
        entityId: params.entityId,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.log("[EVENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
