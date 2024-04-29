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
    const members = await prismadb.member.findMany({
      where: {
        entityId: params.entityId,
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.log("[MEMBERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { firstName, lastName, address, contact } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!firstName || !lastName || !address || !contact) {
      return new NextResponse("Missing info in body", { status: 400 });
    }
    const member = await prismadb.member.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        contact: contact,
        entityId: params.entityId,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.log("[MEMBER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { id, ...data } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.entityId) {
      return new NextResponse("Entity id is required", { status: 400 });
    }

    const member = await prismadb.member.updateMany({
      where: {
        id: id,
        entityId: params.entityId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.log("[MEMBERS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
