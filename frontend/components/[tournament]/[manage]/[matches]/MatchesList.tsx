"use client";

import MatchCard from "./MatchCard";
import { useQuery } from "@tanstack/react-query";
import { getTournamentMatches } from "@/api/matches";
import { MatchList, Match } from "@/types/types";

type Props = {
  tournamentId: number;
};

export default function MatchesList({ tournamentId }: Props) {
  const {
    data: matches,
    isError,
    isLoading,
  } = useQuery<MatchList>({
    queryKey: ["MatchesQuery", tournamentId],

    queryFn: async () => {
      const res = await getTournamentMatches(tournamentId);

      return res;
    },
  });

  console.log(matches);

  if (!matches) {
    return <div>No Matches found.</div>;
  }

  return (
    <div className="">
      <h1>Matches</h1>
      <div className="flex flex-col gap-8 p-8">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            tournamentId={Number(tournamentId)}
          />
        ))}
      </div>
    </div>
  );
}
