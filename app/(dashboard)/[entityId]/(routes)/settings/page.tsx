import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "../../../../../lib/prismadb";
import { SettingsForm } from "@/app/(dashboard)/[entityId]/(routes)/settings/components/settings-forms";

interface SettingPageProps {
  params: {
    entityId: string;
  };
}
const SettingPage: React.FC<SettingPageProps> = async ({ params }) => {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={entity} />
      </div>
    </div>
  );
};
export default SettingPage;
