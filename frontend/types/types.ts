export type Character = {
  id: number;
  name: string;
  faction: string;
  ban_sprite_url: string;
  pick_sprite_url: string;
  created_at: string;
};

export type CharacterList = Character[];
