type Props = {
  tournamentId: number;
  matchId: number;
};

import MatchDetails from "@/components/[tournament]/[manage]/[matches]/MatchDetails";

export async function MatchDetailsPage({ tournamentId, matchId }: Props) {
  return <MatchDetails matchId={matchId} tournamentId={tournamentId} />;
}
