"use client";

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getTournamentTeams } from "@/api/teams";
import { useState } from "react";
import Image from "next/image";

import type { TournamentTeams } from "@/types/types";

type Props = {
  tournamentId: number;
};

export default function CreateMatch({ tournamentId }: Props) {
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [bestOf, setBestOf] = useState<string>("");
  console.log(tournamentId);

  const handleSubmit = async () => {};
  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery<TournamentTeams>({
    queryKey: ["TeamsQuery", tournamentId],

    queryFn: async () => {
      const res = await getTournamentTeams(tournamentId);
      return res;
    },
  });

  if (!teams || teams.length === 0) {
    return <div>No Teams found.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Create Match</h1>

      <div>
        <h1 className="mb-4">Select Participating Teams:</h1>
        <h2>Teams Selected: {selectedTeams.length}/2</h2>
        <div className="grid grid-cols-8 gap-4 place-items-center">
          {teams.map((team) => {
            const isSelected = selectedTeams.includes(team.id);
            const isDisabled = !isSelected && selectedTeams.length >= 2;

            return (
              <div
                key={team.id}
                className={`bg-blue-50 w-24 ${
                  isSelected ? "outline-1 outline-green-500" : ""
                }`}
              >
                <h1>{team.name}</h1>
                <h1>{team.acronym}</h1>

                <Image
                  src={team.logo_url}
                  height={25}
                  width={25}
                  alt={team.name}
                />

                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    setSelectedTeams((selectedTeams) => {
                      if (selectedTeams.includes(team.id)) {
                        return selectedTeams.filter((id) => id !== team.id);
                      }

                      if (selectedTeams.length >= 2) {
                        return selectedTeams;
                      }

                      return [...selectedTeams, team.id];
                    });
                  }}
                  className={`text-black ${
                    isSelected
                      ? "bg-gray-400"
                      : "hover:bg-green-800 hover:text-white"
                  }`}
                >
                  {isSelected ? "Remove" : "Add Team"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <form>
        <Label>Best of</Label>

        <RadioGroup value={bestOf} onValueChange={setBestOf}>
          <div className="flex flex-row gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="bo1">1</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="3" id="3" />
              <Label htmlFor="bo3">3</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="5" id="5" />
              <Label htmlFor="bo5">5</Label>
            </div>
          </div>
        </RadioGroup>

        <button className="mt-4 bg-green-500 hover:bg-green-800 hover:text-white">
          Create Match
        </button>
      </form>
    </div>
  );
}
