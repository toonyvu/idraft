"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { deleteTeam, getTeam } from "@/api/teams";
import { createTeamPlayer, deleteTeamPlayer } from "@/api/players";

import type { PlayersTeam, TeamGet } from "@/types/types";
import { getTeamPlayers } from "@/api/players";

type Props = {
  id: number;
  teamId: number;
};

type FormData = {
  plrName: string;
  role: "survivor" | "hunter";
};

export default function ManageTeamComponent({ id, teamId }: Props) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({
    plrName: "",
    role: "survivor",
  });

  const [valid, setValid] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
  });

  const {
    data: team,
    isError: isTeamError,
    isLoading: isTeamLoading,
  } = useQuery<TeamGet>({
    queryKey: ["TeamQuery", id],
    queryFn: async () => {
      const team = await getTeam(teamId, id);
      return team;
    },
  });

  const {
    data: players,
    isError: isPlayersError,
    isLoading: isPlayersLoading,
  } = useQuery<PlayersTeam>({
    queryKey: ["PlayerQuery", teamId],

    queryFn: async () => {
      const players = await getTeamPlayers(teamId);
      return players;
    },
  });

  console.log(team);

  const createPlayerMutation = useMutation({
    mutationFn: () => createTeamPlayer(formData.plrName, formData.role, teamId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PlayerQuery", teamId],
      });
    },
  });

  const deletePlayerMutation = useMutation({
    mutationFn: (playerId: number) => deleteTeamPlayer(teamId, playerId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PlayerQuery", teamId],
      });
    },
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValid(true);

    try {
      if (!formData.plrName) {
        setErrors({
          ...errors,
          name: "Player name cannot be empty!",
        });

        setValid(false);
        return;
      }

      createPlayerMutation.mutate();
    } catch (err) {
    } finally {
      setValid(true);
    }
  };

  if (isTeamLoading) {
    return (
      <div>
        <h1>Loading team...</h1>
      </div>
    );
  }

  if (isPlayersLoading) {
    return (
      <div>
        <h1>Loading players...</h1>
      </div>
    );
  }

  if (isPlayersError) {
    return (
      <div>
        <h1>Error loading players.</h1>
      </div>
    );
  }

  if (!team || isTeamError) {
    return (
      <div>
        <h1>Error fetching team.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {team?.name} ({team.acronym})
      </h1>

      <h2 className="mt-8">Add players:</h2>
      <form className="w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <label htmlFor="plrName">Player Name</label>
            <input
              value={formData?.plrName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  plrName: e.target.value,
                })
              }
              type="text"
              id="teamName"
              className="outline-1 rounded-md"
            />
          </div>

          <p>Role</p>

          <div className="flex flex-row gap-2">
            <label htmlFor="survivor">Survivor</label>
            <input
              type="radio"
              id="survivor"
              className="rounded-md"
              name="role"
              checked={formData.role === "survivor"}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  role: "survivor",
                });
              }}
            />

            <label htmlFor="hunter">Hunter</label>
            <input
              type="radio"
              id="hunter"
              name="role"
              className="rounded-md"
              checked={formData.role === "hunter"}
              onChange={() => {
                setFormData({
                  ...formData,
                  role: "hunter",
                });
              }}
            />
          </div>

          {team.status !== "created" ? (
            <button className="bg-gray-500" disabled>
              Add Player
            </button>
          ) : (
            <button className="bg-green-400 hover:bg-green-600">
              Add Player
            </button>
          )}
        </div>
      </form>

      <h1 className="mt-8">Roster:</h1>
      {players?.length === 0 && <h1>No players in team.</h1>}
      {players?.map((player) => (
        <div key={player.id} className="mb-4 flex flex-row">
          <div className="flex flex-col">
            <h1>Name: {player.name}</h1>
            <h1>Role: {player.role}</h1>
          </div>
          <button
            className="bg-red-500 h-8"
            onClick={async () => {
              deletePlayerMutation.mutate(player.id);
            }}
          >
            {deletePlayerMutation.isPending ? "Deleting..." : "Delete player"}
          </button>
        </div>
      ))}
    </div>
  );
}
