import TournamentComponent from "@/components/[tournament]/[manage]/[teams]/TournamentComponent";

type Props = {
  id: number;
};

export default function TournamentPage({ id }: Props) {
  return <TournamentComponent id={id} />;
}
