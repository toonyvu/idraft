type Props = {
  id: string;
  matchId: string;
};

import CreateGamePage from "@/pages/CreateGamePage";

export default async function Page({ params }: { params: Promise<Props> }) {
  const { id, matchId } = await params;

  return <CreateGamePage tournamentId={Number(id)} matchId={Number(matchId)} />;
}
