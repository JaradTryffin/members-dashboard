import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "../../../lib/prismadb";
import { Navbar } from "@/components/navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { entityId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const entity = await prismadb.entity.findFirst({
    where: {
      id: params.entityId,
      userId,
    },
  });

  if (!entity) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
