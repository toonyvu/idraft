import TeamsList from "@/components/[tournament]/[manage]/[teams]/TeamsList";

type Props = {
  id: number;
};

export default function TeamsListPage({ id }: Props) {
  return <TeamsList id={id} />;
}
