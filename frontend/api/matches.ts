export async function getTournamentMatches(tournamentId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches?tournamentId=${tournamentId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Error: ${data.message}` || "Internal server error.");
  }

  return data;
}

export async function createTournamentMatch(
  tournamentId: number,
  bestOf: number,
  teamIds: number[],
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/create?tournamentId=${tournamentId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bestOf, teamIds }),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Error: ${data.message}` || "Internal server error.");
  }

  return data;
}
