export type PhaseAction = "ban" | "pick";

export type DraftStep = {
  step: number;
  team: "hunter" | "survivor";
  action: PhaseAction;
  count: number;
};
