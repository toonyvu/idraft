import ManageTeamComponent from "@/components/[tournament]/[manage]/ManageTeamComponent";

type Props = {
  id: number;
  teamId: number;
};

export default function TeamManagePage({ id, teamId }: Props) {
  return <ManageTeamComponent id={id} teamId={teamId} />;
}
