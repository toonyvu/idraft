import type { TeamInsert } from "@/types/types";

export async function createTeam(team: TeamInsert, tournamentId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams/add?tournamentId=${tournamentId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create team: ${res.status}`);
  }

  return res.json();
}

export async function getTournamentTeams(tournamentId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teams?tournamentId=${tournamentId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch teams: ${res.status}`);
  }

  return res.json();
}
