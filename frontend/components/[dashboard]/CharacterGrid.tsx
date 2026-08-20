import type { CharacterList } from "@/types/types";
import Image from "next/image";

type Props = {
  characters: CharacterList;
};

export default function CharacterGrid({ characters }: Props) {
  return (
    <div className="w-full min-h-screen p-8">
      <div className="mx-auto grid w-2/3 grid-cols-10 gap-3">
        {characters.map((character) => (
          <button
            key={character.id}
            className="
              group
              overflow-hidden
              rounded-md
              border
              border-gray-300
              bg-gray-900
              transition
              hover:scale-105
              hover:border-white
            "
          >
            <div className="relative aspect-square w-full">
              <Image
                fill
                className="object-cover"
                alt={character.name}
                src={character.ban_sprite_url}
                sizes="10vw"
              />
            </div>

            <div className="truncate px-1 py-2 text-center text-xs text-white">
              {character.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
