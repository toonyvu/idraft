"use client";

import CharacterGrid from "@/components/[dashboard]/CharacterGrid";
import { useQuery } from "@tanstack/react-query";
const role = "survivor";
import { getCharacters } from "@/api/characters";

export default function DashboardPage() {
  const {
    data: characters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["CharactersQuery"],
    queryFn: async () => {
      const characters = await getCharacters(role);
      console.log(characters);
      return characters;
    },
  });

  if (isLoading) {
    return <div>Loading characters...</div>;
  }
  return <CharacterGrid characters={characters}></CharacterGrid>;
}
