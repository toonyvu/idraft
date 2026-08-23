"use client";
import { useState } from "react";
import { signup } from "@/api/signup";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password || !passwordR) {
      return;
    }

    const res = await signup(username, password, email);
    if (res.ok) {
      router.push("/tournaments");
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">Sign Up!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/4">
        <label htmlFor="username">Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          className="outline-1 rounded-sm"
        />

        <label htmlFor="username">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          className="outline-1 rounded-sm"
        />

        <label htmlFor="password">Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          id="password"
          className="outline-1 rounded-sm"
        />

        <label htmlFor="passwordR">Repeat Password:</label>
        <input
          value={passwordR}
          onChange={(e) => setPasswordR(e.target.value)}
          type="text"
          id="passwordR"
          className="outline-1 rounded-sm"
        />

        {error ? <h1>{error}</h1> : ""}

        <button
          type="submit"
          className="bg-gray-400 hover:bg-gray-600 text-white"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
