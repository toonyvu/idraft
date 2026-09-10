"use client";

type Props = {
  tournamentId: number;
  matchId: number;
};
import type { CreateGameType } from "@/types/types";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapList, Match, Player } from "@/types/types";
import { getAllMaps } from "@/api/maps";
import { getTournamentMatch } from "@/api/matches";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { createGame } from "@/api/games";

export default function CreateGame({ tournamentId, matchId }: Props) {
  const router = useRouter();
  const {
    data: maps,
    isError: isMapsError,
    isLoading: isMapsLoading,
  } = useQuery<MapList>({
    queryKey: ["MapsQuery"],

    queryFn: async () => {
      const res = await getAllMaps();
      return res;
    },
  });

  const {
    data: match,
    isError: isMatchError,
    isLoading: isMatchLoading,
  } = useQuery<Match>({
    queryKey: ["matchQuery", tournamentId, matchId],

    queryFn: async () => {
      const res = await getTournamentMatch(tournamentId, matchId);
      return res[0];
    },
  });

  const [mapValue, setMapValue] = useState<string>("");
  const [startingSurvivorTeamId, setStartingSurvivorTeamId] = useState<
    number | null
  >(null);
  const [half1HunterPlayerId, setHalf1HunterPlayerId] = useState<number | null>(
    null,
  );
  const [half1SurvivorPlayerIds, setHalf1SurvivorPlayerIds] = useState<
    number[]
  >([]);

  const [half2HunterPlayerId, setHalf2HunterPlayerId] = useState<number | null>(
    null,
  );
  const [half2SurvivorPlayerIds, setHalf2SurvivorPlayerIds] = useState<
    number[]
  >([]);

  const team1Id = match?.teams[0].id;
  const team2Id = match?.teams[1].id;

  const selectedSurvivorTeamId = startingSurvivorTeamId ?? team1Id;

  const otherTeamId = team1Id === selectedSurvivorTeamId ? team2Id : team1Id;

  const half1HunterTeamId = otherTeamId;
  const half1SurvTeamId = selectedSurvivorTeamId;

  const half2HunterTeamId = selectedSurvivorTeamId;
  const half2SurvTeamId = otherTeamId;

  const half1SurvTeam = match?.teams.find(
    (team) => team.id === half1SurvTeamId,
  );
  const half1HunterTeam = match?.teams.find(
    (team) => team.id === half1HunterTeamId,
  );

  const half1Hunters = half1HunterTeam?.players.filter(
    (player) => player.role === "hunter",
  );

  const half1Survs = half1SurvTeam?.players.filter(
    (player) => player.role === "survivor",
  );

  const half2SurvTeam = match?.teams.find(
    (team) => team.id === half2SurvTeamId,
  );
  const half2HunterTeam = match?.teams.find(
    (team) => team.id === half2HunterTeamId,
  );

  const half2Survs = half2SurvTeam?.players.filter(
    (player) => player.role === "survivor",
  );

  const half2Hunters = half2HunterTeam?.players.filter(
    (player) => player.role === "hunter",
  );

  const handleCreateGame = async () => {
    if (!half1SurvTeamId || !half1HunterTeamId || !half1HunterPlayerId) {
      return;
    }

    if (!half2SurvTeamId || !half2HunterTeamId || !half2HunterPlayerId) {
      return;
    }
    const gameData: CreateGameType = {
      mapName: mapValue,

      halves: [
        {
          halfNumber: 1,
          hunterTeamId: half1HunterTeamId,
          survivorTeamId: half1SurvTeamId,
          hunterPlayerId: half1HunterPlayerId,
          survivorPlayerIds: half1SurvivorPlayerIds,
        },

        {
          halfNumber: 2,
          hunterTeamId: half2HunterTeamId,
          survivorTeamId: half2SurvTeamId,
          hunterPlayerId: half2HunterPlayerId,
          survivorPlayerIds: half2SurvivorPlayerIds,
        },
      ],
    };

    const res = await createGame(gameData, matchId);

    if (res.success) {
      console.log(res.message);
      router.push(`/tournaments/${tournamentId}/matches/${matchId}`);
    }
  };

  if (!maps) {
    return <div>Error Finding Maps.</div>;
  }

  if (!match) {
    return <div>Error finding match.</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl flex flex-col">Create Game</h1>

      <div className="flex flex-col gap-8">
        <Collapsible>
          <div className="w-[90%] bg-gray-100 place-self-center">
            <div className="flex flex-row justify-between items-center">
              <h2>Game Settings</h2>
              <CollapsibleTrigger
                className=""
                render={
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronDown></ChevronDown>
                  </Button>
                }
              ></CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div>
                <div className="flex flex-row gap-8">
                  <h3>Map Selection</h3>
                  <Select
                    value={mapValue}
                    onValueChange={(value) => setMapValue(value ?? "")}
                  >
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choose a map..." />
                    </SelectTrigger>

                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        <SelectLabel>Maps</SelectLabel>
                        {maps.map((map) => (
                          <SelectItem key={map.id} value={map.map_name}>
                            {map.map_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <h3>Which team in which the survivor side play first?</h3>
                <div className="flex flex-row gap-4 mt-2">
                  {match.teams.map((team) => {
                    const isSelected = selectedSurvivorTeamId === team.id;

                    return (
                      <Button
                        key={team.id}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => {
                          setStartingSurvivorTeamId(team.id);
                          setHalf1HunterPlayerId(null);
                          setHalf1SurvivorPlayerIds([]);
                          setHalf2HunterPlayerId(null);
                          setHalf2SurvivorPlayerIds([]);
                        }}
                      >
                        {team.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Collapsible>
          <div className="w-[90%] bg-gray-100 place-self-center">
            <div className="flex flex-row justify-between items-center">
              <h1>Half 1</h1>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronDown></ChevronDown>
                  </Button>
                }
              ></CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div>
                <h2>
                  <span>Hunter Team: </span>
                  {half1HunterTeam?.name}
                </h2>

                <h2>Select Hunter:</h2>
                <Select
                  value={
                    half1HunterPlayerId !== null
                      ? String(half1HunterPlayerId)
                      : ""
                  }
                  onValueChange={(value) => {
                    setHalf1HunterPlayerId(value ? Number(value) : null);
                  }}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Choose a player..." />
                  </SelectTrigger>

                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      <SelectLabel>Players</SelectLabel>

                      {half1Hunters?.map((player) => (
                        <SelectItem key={player.id} value={String(player.id)}>
                          {player.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <h2>Select Survivors:</h2>

                {half1Survs?.map((player) => {
                  const checked = half1SurvivorPlayerIds.includes(player.id);

                  return (
                    <div key={player.id} className="flex flex-row gap-2">
                      <Checkbox
                        checked={checked}
                        disabled={
                          !checked && half1SurvivorPlayerIds.length >= 4
                        }
                        onCheckedChange={(value) => {
                          if (value) {
                            setHalf1SurvivorPlayerIds((prev) => [
                              ...prev,
                              player.id,
                            ]);
                          } else {
                            setHalf1SurvivorPlayerIds((prev) =>
                              prev.filter((id) => id !== player.id),
                            );
                          }
                        }}
                      />

                      <label htmlFor="">{player.name}</label>
                    </div>
                  );
                })}
                <span>{half1SurvivorPlayerIds.length}/4 players selected.</span>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Collapsible>
          <div className="w-[90%] bg-gray-100 place-self-center">
            <div className="flex flex-row justify-between items-center">
              <h1>Half 2</h1>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronDown></ChevronDown>
                  </Button>
                }
              ></CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div>
                <h2>
                  <span>Hunter Team: </span>
                  {half2HunterTeam?.name}
                </h2>

                <h2>Select Hunter:</h2>
                <Select
                  value={
                    half2HunterPlayerId !== null
                      ? String(half2HunterPlayerId)
                      : ""
                  }
                  onValueChange={(value) => {
                    setHalf2HunterPlayerId(value ? Number(value) : null);
                  }}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Choose a player..." />
                  </SelectTrigger>

                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      <SelectLabel>Players</SelectLabel>

                      {half2Hunters?.map((player) => (
                        <SelectItem key={player.id} value={String(player.id)}>
                          {player.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <h2>Select Survivors:</h2>

                {half2Survs?.map((player) => {
                  const checked = half2SurvivorPlayerIds.includes(player.id);

                  return (
                    <div key={player.id} className="flex flex-row gap-2">
                      <Checkbox
                        checked={checked}
                        disabled={
                          !checked && half2SurvivorPlayerIds.length >= 4
                        }
                        onCheckedChange={(value) => {
                          if (value) {
                            setHalf2SurvivorPlayerIds((prev) => [
                              ...prev,
                              player.id,
                            ]);
                          } else {
                            setHalf2SurvivorPlayerIds((prev) =>
                              prev.filter((id) => id !== player.id),
                            );
                          }
                        }}
                      />

                      <label htmlFor="">{player.name}</label>
                    </div>
                  );
                })}
                <span>{half2SurvivorPlayerIds.length}/4 players selected.</span>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Button onClick={handleCreateGame}>Add Game</Button>
      </div>
    </div>
  );
}
