type Props = {
  id: string;
  matchId: string;
};

import { MatchDetailsPage } from "@/pages/MatchDetailsPage";

export default async function Page({ params }: { params: Promise<Props> }) {
  const { id, matchId } = await params;

  return (
    <MatchDetailsPage matchId={Number(matchId)} tournamentId={Number(id)} />
  );
}
