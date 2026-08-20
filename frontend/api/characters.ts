export async function getCharacters(role: string) {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/characters?role=${role}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch characters: ${res.status}`);
  }

  return res.json();
}
