export async function getAllMaps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maps/get`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Internal Server Error");
  }
  return data;
}
