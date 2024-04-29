import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const entity = await prismadb.entity.findFirst({
    where: {
      userId,
    },
  });

  if (entity) {
    redirect(`/${entity.id}`);
  }
  return <>{children}</>;
}
