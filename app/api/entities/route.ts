import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const entity = await prismadb.entity.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(entity);
  } catch (error) {
    console.log("[ENTITY_POST]", error);
    return new NextResponse("Interanl Server Error", { status: 500 });
  }
}
