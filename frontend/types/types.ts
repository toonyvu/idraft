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
