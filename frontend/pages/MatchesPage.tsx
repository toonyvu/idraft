import MatchesList from "@/components/[tournament]/[manage]/[matches]/MatchesList";

type Props = {
  tournamentId: number;
};

export default function MatchesPage({ tournamentId }: Props) {
  return <MatchesList tournamentId={tournamentId} />;
}
