"use client";

type Props = {
  tournamentId: number;
  matchId: number;
};

import { useQuery } from "@tanstack/react-query";

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
import { MapList, Match } from "@/types/types";
import { getAllMaps } from "@/api/maps";
import { getTournamentMatch } from "@/api/matches";
import { useState } from "react";

export default function CreateGame({ tournamentId, matchId }: Props) {
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

  if (!maps) {
    return <div>Error Finding Maps.</div>;
  }
  console.log(maps);
  return (
    <div>
      <h1 className="font-bold text-3xl">Create Game</h1>

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
                {match?.teams.map((team) => {
                  const isSelected = startingSurvivorTeamId === team.id;

                  return (
                    <Button
                      key={team.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => setStartingSurvivorTeamId(team.id)}
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
    </div>
  );
}
