export async function getMatchGames(matchId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/games/get?matchId=${matchId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Internal server error.");
  }

  return data;
}
