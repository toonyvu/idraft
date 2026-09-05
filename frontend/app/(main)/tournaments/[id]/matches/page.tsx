import MatchesPage from "@/pages/MatchesPage";

type Props = {
  id: number;
};

export default async function Page({ params }: { params: Promise<Props> }) {
  const { id } = await params;
  console.log(id);
  return <MatchesPage tournamentId={Number(id)} />;
}
