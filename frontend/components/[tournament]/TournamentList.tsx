"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTournaments } from "@/api/tournaments";
import { useRouter } from "next/navigation";

import type { Tournament, TournamentList } from "@/types/types";

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
          <div key={tournament.id} className="flex flex-col space-y-4">
            <h1>{tournament.name}</h1>
            <p>{tournament.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
