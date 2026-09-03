import TeamsList from "@/components/[tournament]/[manage]/[teams]/TeamsList";

type Props = {
  id: number;
};

export async function TeamsListPage({ id }: Props) {
  return <TeamsList id={id} />;
}
