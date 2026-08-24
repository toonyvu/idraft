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
