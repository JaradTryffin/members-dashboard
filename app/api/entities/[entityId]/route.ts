import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.entityId) {
      return new NextResponse("Entity id is required", { status: 400 });
    }

    const entity = await prismadb.entity.updateMany({
      where: {
        id: params.entityId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(entity);
  } catch (error) {
    console.log("[ENTITY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.entityId) {
      return new NextResponse("Entity id is required", { status: 400 });
    }

    const entity = await prismadb.entity.deleteMany({
      where: {
        id: params.entityId,
        userId,
      },
    });

    return NextResponse.json(entity);
  } catch (error) {
    console.log("[ENTITY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
