export type PhaseAction = "ban" | "pick";

export type DraftStep = {
  step: number;
  team: "hunter" | "survivor";
  action: PhaseAction;
  count: number;
};

export type Team = {
  name: string;
  tournamentId: number;
  logo_url: number;
};
