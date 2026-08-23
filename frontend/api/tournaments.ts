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
