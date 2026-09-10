import { CreateGameType } from "@/types/types";

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

export async function createGame(game: CreateGameType, matchId: number) {
  console.log(game);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/games/create?matchId=${matchId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game }),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Internal server error.");
  }

  return data;
}
