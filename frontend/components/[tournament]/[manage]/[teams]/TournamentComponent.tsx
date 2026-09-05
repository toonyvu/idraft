"use client";

import type { TeamGet, Tournament } from "@/types/types";
import type { TournamentTeams } from "@/types/types";
type Props = {
  id: number;
};

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTournamentById } from "@/api/tournaments";
import { uploadTeamImage } from "@/lib/uploadImages";
import { createTeam, getTournamentTeams } from "@/api/teams";
import { deleteTeam } from "@/api/teams";
import Image from "next/image";
type TeamInsert = {
  teamName: string;
  image_url: string;
  acronym: string;
};

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TournamentComponent({ id }: Props) {
  const router = useRouter();
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

  if (!tournament) {
    return <div>Unable to fetch tournament.</div>;
  }

  return (
    <div>
      <h1>Tournament Page {id}</h1>

      <div className="mb-8">
        <h2>Tournament Name: {tournament?.name}</h2>
        <h2>Description: {tournament?.description}</h2>
      </div>

      <div>Competing Teams:</div>

      <div className="mb-8">
        {teams?.length === 0 && <h1>No Teams Found.</h1>}

        {teams?.map((team: TeamGet) => (
          <div key={team.id} className="flex w-1/2 items-center gap-4">
            {/* Team information */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={team.logo_url}
                width={25}
                height={25}
                alt={team.name}
              />

              <div className="flex flex-row">
                <div className="flex flex-col">
                  <h1>{team.name}</h1>
                  <h2>{team.acronym}</h2>
                </div>

                <div className="flex flex-1 gap-4">
                  <button
                    className="ml-auto h-8 bg-green-400 px-3 hover:bg-green-600"
                    onClick={() => {
                      router.push(`/tournaments/${id}/teams/manage/${team.id}`);
                    }}
                  >
                    Manage team roster
                  </button>

                  <button
                    className="ml-auto h-8 bg-red-400 px-3 hover:bg-red-600"
                    onClick={() => {
                      deleteTeam(team.id, tournament?.id);
                    }}
                  >
                    Remove Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger
          render={
            <button className="h-8 bg-green-500">Start Tournament</button>
          }
        ></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Tournament</DialogTitle>
            <DialogDescription>
              Pressing confirm will start the tournament. Once clicked, you can
              no longer add/delete new teams and change team rosters. This
              action is NOT reversible!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose
              render={<button className="h-8 bg-gray-500">Cancel</button>}
            />
            <button className="bg-green-400">Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>List of Matches:</div>
    </div>
  );
}
