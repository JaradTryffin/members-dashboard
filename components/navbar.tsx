import { auth, UserButton } from "@clerk/nextjs";
import EntitySwitcher from "@/components/entity-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { NavigationMenuDemo } from "@/components/navigation-menu";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const entity = await prismadb.entity.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <EntitySwitcher items={entity} />

        {/*<MainNav className="mx-6" />*/}
        <div className="ml-5">
          <NavigationMenuDemo />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
