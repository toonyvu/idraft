export async function getTeamPlayers(teamId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/players/get?teamId=${teamId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Error getting players, ${res.status}`);
  }

  return data;
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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Error inserting player, ${res.status}`);
  }

  return data;
}

export async function deleteTeamPlayer(teamId: number, playerId: number) {
  console.log(teamId, playerId);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/players/delete?teamId=${teamId}&playerId=${playerId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Error deleting player, ${res.status}`);
  }

  return data;
}
