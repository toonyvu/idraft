type Props = {
  tournamentId: number;
  matchId: number;
};

import CreateGame from "@/components/[tournament]/[manage]/[games]/[create]/CreateGame";

export default function CreateGamePage({ tournamentId, matchId }: Props) {
  return <CreateGame tournamentId={tournamentId} matchId={matchId} />;
}
