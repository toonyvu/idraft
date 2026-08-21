export async function signup(
  email: string,
  password: string,
  username: string,
) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await result.json();
  return { ok: result.ok, data: data };
}
