"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function TournamentSidebar({ id }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <h1>Tournament</h1>
        <p
          className="hover:bg-gray-500"
          onClick={() => {
            router.push(`/tournaments/${id}`);
          }}
        >
          Manage Tournament
        </p>
      </div>

      <div>
        <h1>Teams</h1>
        <p
          className="hover:bg-gray-500"
          onClick={() => {
            router.push(`/tournaments/${id}/teams/manage`);
          }}
        >
          Manage Teams
        </p>
      </div>

      <div>
        <h1>Matches</h1>
        <p
          className="hover:bg-gray-500"
          onClick={() => {
            router.push(`/tournaments/${id}/matches`);
          }}
        >
          Manage Matches
        </p>
        <p
          className="hover:bg-gray-500"
          onClick={() => {
            router.push(`/tournaments/${id}/matches/create`);
          }}
        >
          Create Match
        </p>
      </div>
    </div>
  );
}
