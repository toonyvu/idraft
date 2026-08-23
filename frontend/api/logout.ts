export async function logout() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  return data;
}
