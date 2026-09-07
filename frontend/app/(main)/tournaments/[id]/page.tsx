import TournamentPage from "@/pages/TournamentPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return <TournamentPage id={Number(id)} />;
}
