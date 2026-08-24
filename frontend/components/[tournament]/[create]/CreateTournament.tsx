"use client";

import { useState } from "react";
import { createNewTournament } from "@/api/tournaments";
import { useRouter } from "next/navigation";

export default function CreateTournament() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTourney = await createNewTournament(name, description);

    const id = newTourney.id;
    console.log(id);

    router.push(`/tournaments/${id}`);
  };
  return (
    <div>
      <h1>Create new Tournament:</h1>
      <form onSubmit={handleSubmit} className="w-1/4 flex flex-col">
        <label htmlFor="tournamentName">Tournament Name:</label>
        <input
          type="text"
          id="tournamentName"
          className="outline-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          className="outline-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-amber-500 hover:bg-amber-700">Submit</button>
      </form>
    </div>
  );
}
