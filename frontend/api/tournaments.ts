import { Tournament } from "@/types/types";

export async function getAllTournaments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tournaments: ${res.status}`);
  }

  return res.json();
}

export async function createNewTournament(
  name: string,
  description: string,
): Promise<Tournament> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tournaments/create`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create new tournament: ${res.status}`);
  }

  return res.json();
}

export async function getTournamentById(id: number): Promise<Tournament> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tournaments/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to get tournament: ${res.status}`);
  }

  return res.json();
}

export async function deleteTournament(tournamentId: number) {
  console.log(tournamentId);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tournaments/delete?tournamentId=${tournamentId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error deleting tournament.");
  }

  return data;
}

export async function changeTournamentStatus(
  tournamentId: number,
  status: string,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tournaments/status?tournamentId=${tournamentId}&status=${status}`,
    {
      method: "PUT",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error changing tournament status");
  }

  return data;
}

export async function getTournamentStatus(tournamentId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tournaments/status/get?tournamentId=${tournamentId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error fetching tournament status");
  }

  return data.status;
}
