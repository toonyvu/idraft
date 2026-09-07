type Props = {
  tournamentId: number;
  matchId: number;
};
import { getMatchGames } from "@/api/games";
import type { Game, GamesList } from "@/types/types";

import { useQuery } from "@tanstack/react-query";

export default function GamesList({ tournamentId, matchId }: Props) {
  const { data: games } = useQuery<GamesList>({
    queryKey: ["gamesList", matchId],

    queryFn: async () => {
      const res = await getMatchGames(Number(matchId));
      return res;
    },
  });

  console.log(games);

  if (games?.length === 0) {
    return <div>No games found.</div>;
  }

  return (
    <div>
      <h1>Games List</h1>
      <div>
        {games?.map((game: Game) => (
          <div key={game.id}></div>
        ))}
      </div>
    </div>
  );
}
