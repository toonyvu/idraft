"use client";

type Props = {
  matchId: number;
  tournamentId: number;
};
import type { Match } from "@/types/types";

import { useQuery } from "@tanstack/react-query";
import { getTournamentMatch } from "@/api/matches";
import GamesList from "../[games]/GamesList";
import Image from "next/image";

export default function MatchDetails({ matchId, tournamentId }: Props) {
  const { data: matchInfo } = useQuery<Match>({
    queryKey: ["matchQuery", tournamentId, matchId],

    queryFn: async () => {
      const res = await getTournamentMatch(tournamentId, matchId);
      return res[0];
    },
  });

  if (!matchInfo) {
    return <div>Match Information not found.</div>;
  }

  if (!matchInfo || !matchInfo.teams || matchInfo.teams.length < 2) {
    return <div>Match Information not found.</div>;
  }

  const team1 = matchInfo.teams[0];
  const team2 = matchInfo.teams[1];

  console.log(matchInfo);
  return (
    <div className="mx-auto w-full p-8">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Match Details</h1>
        <p className="text-sm text-muted-foreground">Match #{matchInfo.id}</p>
      </div>

      {/* Match card */}
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        {/* Match information */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <span className="rounded-full border px-4 py-1 text-sm font-semibold">
            BO{matchInfo.best_of}
          </span>

          <p className="text-sm text-muted-foreground">
            Status: {matchInfo.status}
          </p>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-center gap-36">
          {/* Team 1 */}
          <div className="flex w-40 flex-col items-center gap-2">
            <p className="text-sm font-semibold text-muted-foreground">
              {team1.acronym}
            </p>

            <div className="relative h-28 w-28">
              <Image
                loading="eager"
                src={team1.logo_url}
                fill
                alt={team1.name}
                className="object-contain"
              />
            </div>

            <p className="text-lg font-semibold">{team1.name}</p>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold text-muted-foreground">VS</span>
          </div>

          {/* Team 2 */}
          <div className="flex w-40 flex-col items-center gap-2">
            <p className="text-sm font-semibold text-muted-foreground">
              {team2.acronym}
            </p>

            <div className="relative h-28 w-28">
              <Image
                loading="eager"
                src={team2.logo_url}
                fill
                alt={team2.name}
                className="object-contain"
              />
            </div>

            <p className="text-lg font-semibold">{team2.name}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-bold">Games</h1>
        <button className="mt-2 bg-green-400 hover:bg-green-600 p-1 rounded-sm">
          Create Game
        </button>
        <GamesList tournamentId={tournamentId} matchId={matchId} />
      </div>
    </div>
  );
}
