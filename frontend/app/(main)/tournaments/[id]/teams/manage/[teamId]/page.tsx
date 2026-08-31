import TeamManagePage from "@/pages/TeamManagePage";

type Props = {
  id: string;
  teamId: string;
};

export default async function Page({ params }: { params: Promise<Props> }) {
  const { id, teamId } = await params;
  return <TeamManagePage id={Number(id)} teamId={Number(teamId)} />;
}
