export type Character = {
  id: number;
  name: string;
  faction: string;
  ban_sprite_url: string;
  pick_sprite_url: string;
  created_at: string;
};

export type CharacterList = Character[];

export type TournamentList = Tournament[];

export type Tournament = {
  id: number;
  name: string;
  description: string;
  status: string;
  owner_id: number;
  created_at: string;
};

export type TeamInsert = {
  teamName: string;
  image_url: string;
  acronym: string;
};

export type TeamGet = {
  id: number;
  name: string;
  logo_url: string;
  created_at: string;
  tournament_id: number;
  owner_id: string;
  acronym: string;
  status: string;
};

export type TournamentTeams = TeamGet[];

export type PlayerGet = {
  id: number;
  name: string;
  role: string;
  team_id: number;
  created_at: string;
};

export type PlayersTeam = PlayerGet[];

export type Match = {
  id: number;
  tournament_id: number;
  best_of: number;
  status: string;
  created_at: string;
};

export type MatchList = Match[];
