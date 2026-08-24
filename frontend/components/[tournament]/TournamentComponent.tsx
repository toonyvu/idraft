type Props = {
  id: number;
};

export default function TournamentComponent({ id }: Props) {
  console.log(id);
  return (
    <div>
      <h1>Tournament Page {id}</h1>
    </div>
  );
}
