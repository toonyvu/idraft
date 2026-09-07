"use client";

import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { deleteTournament, getAllTournaments } from "@/api/tournaments";
import { useRouter } from "next/navigation";

import type { Tournament, TournamentList } from "@/types/types";
import { queryClient } from "@/app/queryClient";

export default function TournamentList() {
  const router = useRouter();

  const {
    data: tournaments,
    isLoading,
    isError,
  } = useQuery<TournamentList>({
    queryKey: ["tournamentsQuery"],
    queryFn: async () => {
      const result = await getAllTournaments();
      return result;
    },
  });

  const deleteTournamentMutation = useMutation({
    mutationFn: (tournamentId: number) => deleteTournament(tournamentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tournamentsQuery"],
      });
    },
  });

  console.log(tournaments);

  if (isLoading) {
    return (
      <div>
        <h1>Fetching Tournaments...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error with fetching tournaments.</h1>
      </div>
    );
  }

  if (tournaments?.length === 0) {
    return (
      <div>
        <button
          className="bg-amber-300 hover:bg-amber-600"
          onClick={() => {
            router.push("/tournaments/new");
          }}
        >
          Create new tournament
        </button>

        <div>
          <h1>
            No Tournaments found. Create one by clicking on create tournament
            button.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        className="bg-amber-300 hover:bg-amber-600"
        onClick={() => {
          router.push("/tournaments/new");
        }}
      >
        Create new tournament
      </button>

      <div>
        <h1>List of tournaments:</h1>

        {tournaments?.map((tournament: Tournament) => (
          <div key={tournament.id} className="flex flex-col">
            <h1>Name: {tournament.name}</h1>
            <p>Description: {tournament.description}</p>
            <button
              onClick={() => {
                router.push(`/tournaments/${tournament.id}`);
              }}
              className="h-8 bg-green-400"
            >
              Go To Tournament
            </button>
            <button
              className="h-8 bg-red-400"
              onClick={() => {
                deleteTournamentMutation.mutate(tournament.id);
              }}
            >
              Delete Tournament
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
