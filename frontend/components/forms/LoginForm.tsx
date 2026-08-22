"use client";
import { useState } from "react";
import { login } from "@/api/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    } else {
      const user = await login(username, password);
      if (user) {
        router.push("/tournaments");
      }
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col w-1/4" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
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

        <button
          type="submit"
          className="bg-gray-400 hover:bg-gray-600 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
