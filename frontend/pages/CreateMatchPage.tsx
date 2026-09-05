import CreateMatch from "@/components/[tournament]/[manage]/[matches]/CreateMatch";

type Props = {
  tournamentId: number;
};

export default function CreateMatchPage({ tournamentId }: Props) {
  return <CreateMatch tournamentId={tournamentId} />;
}
