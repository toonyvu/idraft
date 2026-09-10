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

export type CreateHalfType = {
  halfNumber: 1 | 2;
  hunterTeamId: number;
  survivorTeamId: number;
  hunterPlayerId: number;
  survivorPlayerIds: number[];
};

export type CreateGameType = {
  mapName: string;
  halves: CreateHalfType[];
};
