import { TeamsListPage } from "@/pages/TeamsListPage";

type Props = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Props> }) {
  const { id } = await params;
  return <TeamsListPage id={Number(id)} />;
}
