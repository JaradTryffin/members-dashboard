import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { entityId: string };
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const entity = await prismadb.entity.findFirst({
    where: {
      id: params.entityId,
    },
  });
  return <div>Active Entity: {entity?.name}</div>;
};

export default DashboardPage;
