import Image from "next/image";

import type { Match } from "@/types/types";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTournamentMatch } from "@/api/matches";

type Props = {
  match: Match;
  tournamentId: number;
};

export default function MatchCard({ match, tournamentId }: Props) {
  const router = useRouter();
  const [team1, team2] = match.teams;

  const { data: matchInfo } = useQuery<Match>({
    queryKey: ["matchQuery", tournamentId, match.id],

    queryFn: async () => {
      const res = await getTournamentMatch(tournamentId, match.id);
      return res;
    },
  });

  return (
    <div className="border rounded-lg p-4 w-full">
      <div className="flex justify-between mb-4">
        <h2>Match #{match.id}</h2>

        <span className="capitalize">{match.status.replace("_", " ")}</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Match information */}
        <div className="basis-[70%] flex items-center justify-between">
          {/* Team 1 */}
          <div className="flex items-center gap-2">
            <Image
              src={team1.logo_url}
              width={50}
              height={50}
              alt={team1.name}
            />
            <p>{team1.acronym}</p>
          </div>

          {/* BO */}
          <div className="text-xl font-bold">BO{match.best_of}</div>

          {/* Team 2 */}
          <div className="flex items-center gap-2">
            <p>{team2.acronym}</p>
            <Image
              src={team2.logo_url}
              width={50}
              height={50}
              alt={team2.name}
            />
          </div>
        </div>

        {/* Button */}
        <button
          className="bg-green-500 w-fit px-4 ml-auto h-8 hover:bg-green-700"
          onClick={() => {
            router.push(`/tournaments/${tournamentId}/matches/${match.id}`);
          }}
        >
          Manage match
        </button>
      </div>
    </div>
  );
}
