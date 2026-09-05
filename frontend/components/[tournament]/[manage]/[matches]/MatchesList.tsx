"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { getTournamentMatches } from "@/api/matches";
import { MatchList } from "@/types/types";

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

  if (!matches) {
    return <div>No Matches found.</div>;
  }

  return (
    <div>
      <h1>Matches Page</h1>

      <h1>Match List</h1>
      {matches.length === 0 && (
        <div>
          <h1>No matches found.</h1>
        </div>
      )}

      <h1>Create a new match</h1>

      {matches.map((match) => (
        <div key={match.id}>
          <h1>{match.created_at}</h1>
        </div>
      ))}
      <form>
        <Label>Best of</Label>
        <RadioGroup defaultValue="">
          <div className="flex flex-row gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="1" id="1"></RadioGroupItem>
              <Label htmlFor="1">1</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="3" id="3"></RadioGroupItem>
              <Label htmlFor="3">3</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="5" id="5"></RadioGroupItem>
              <Label htmlFor="5">5</Label>
            </div>
          </div>
        </RadioGroup>
      </form>
    </div>
  );
}
