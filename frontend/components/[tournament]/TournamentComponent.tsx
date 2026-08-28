"use client";

import type { TeamGet, Tournament } from "@/types/types";
import type { TournamentTeams } from "@/types/types";
type Props = {
  id: number;
};

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getTournamentById } from "@/api/tournaments";
import { uploadTeamImage } from "@/lib/uploadImages";
import { createTeam, getTournamentTeams } from "@/api/teams";
type TeamInsert = {
  teamName: string;
  image_url: string;
  acronym: string;
};

export default function TournamentComponent({ id }: Props) {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<TeamInsert>({
    teamName: "",
    image_url: "",
    acronym: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);
      const imgUrl = await uploadTeamImage(file);

      setFormData((prev) => ({
        ...prev,
        image_url: imgUrl,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const uploadTeam = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.teamName || !formData.image_url) return;
    createTeamMutation.mutate(formData);
  };

  const queryClient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationFn: (team: TeamInsert) => createTeam(team, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TeamsQuery", id],
      });
    },
  });

  const {
    data: tournament,
    isError: isTournamentError,
    isLoading: isTournamentLoading,
  } = useQuery<Tournament>({
    queryKey: ["tournamentQuery", id],

    queryFn: async () => {
      const res = getTournamentById(Number(id));

      return res;
    },
  });

  const { data: teams, isError: isTeamsError } = useQuery<TournamentTeams>({
    queryKey: ["TeamsQuery", id],
    queryFn: async () => {
      const res = await getTournamentTeams(id);
      return res;
    },
  });

  if (isTournamentLoading) {
    return <h1>Loading...</h1>;
  }

  if (isTournamentError) {
    return <h1>Error fetching tournament.</h1>;
  }

  return (
    <div>
      <h1>Tournament Page {id}</h1>

      <div>
        <h2>Tournament Name: {tournament?.name}</h2>
        <h2>Description: {tournament?.description}</h2>
      </div>

      <div>Competing Teams:</div>

      <div>
        {teams?.length === 0 && <h1>No Teams Found.</h1>}

        {teams?.map((team: TeamGet) => (
          <div key={team.id}>
            <h1>{team.name}</h1>
            <h2>{team.acronym}</h2>
          </div>
        ))}
      </div>

      <h1 className="bg-green-500">Create Team</h1>
      <form onSubmit={uploadTeam}>
        <div className="flex flex-col w-1/2 ">
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            id="teamName"
            value={formData.teamName}
            onChange={(e) =>
              setFormData({
                ...formData,
                teamName: e.target.value,
              })
            }
            className="outline-1"
          />

          <label htmlFor="teamAcronym">Team Acronym</label>
          <input
            type="text"
            id="teamAcronym"
            value={formData.acronym}
            onChange={(e) =>
              setFormData({
                ...formData,
                acronym: e.target.value,
              })
            }
            className="outline-1"
          />

          <label htmlFor="logoUrl">Logo URL (PNG)</label>
          <input
            type="file"
            className="bg-green-400 hover:bg-green-600"
            accept="image/png"
            onChange={handleImageUpload}
          />

          <button className="bg-green-400 hover:bg-green-600">Submit</button>
        </div>
      </form>

      <div>List of Matches:</div>
    </div>
  );
}
