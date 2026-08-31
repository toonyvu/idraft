export async function getTeamPlayers(teamId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/players/get?teamId=${teamId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Error retrieving team: ${res.status}`);
  }

  return res.json();
}

export async function createTeamPlayer(
  name: string,
  role: string,
  teamId: number,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/players/new?teamId=${teamId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role }),
    },
  );

  if (!res.ok) {
    throw new Error(`Error inserting Player, ${res.status}`);
  }

  return res.json();
}
