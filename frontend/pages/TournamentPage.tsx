import TournamentComponent from "@/components/[tournament]/TournamentComponent";

type Props = {
  id: number;
};

export default function TournamentPage({ id }: Props) {
  return <TournamentComponent id={id} />;
}
