import CreateMatchPage from "@/pages/CreateMatchPage";

type Props = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Props> }) {
  const { id } = await params;
  return <CreateMatchPage tournamentId={Number(id)} />;
}
