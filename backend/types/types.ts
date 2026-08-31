export type PhaseAction = "ban" | "pick";

export type DraftStep = {
  step: number;
  team: "hunter" | "survivor";
  action: PhaseAction;
  count: number;
};

export type Team = {
  teamName: string;
  tournamentId: number;
  image_url: number;
  acronym: string;
};
