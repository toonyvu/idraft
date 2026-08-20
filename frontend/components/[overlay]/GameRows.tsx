type GameRowsProps = {
  bestOf: 1 | 3 | 5;
  side: "left" | "right";
};

import GlobalBanSlot from "./GlobalBanSlot";

export default function GameRows({ bestOf, side }: GameRowsProps) {
  const rowCount = bestOf - 1;
  const slotCount = side === "left" ? 4 : 1;

  return (
    <div
      className={`absolute top-2 flex flex-col gap-1 ${side === "left" ? "left-2" : "right-2"}`}
    >
      {Array.from({ length: rowCount }, (_, index) => (
        <div
          key={index}
          className={`mb-1 ${side === "right" ? "flex flex-col items-end" : ""}`}
        >
          <h2 className="text-xl font-bold">Game {index + 1}</h2>

          <div className="flex gap-5">
            {Array.from({ length: slotCount }, (_, slotIndex) => (
              <div key={slotIndex}>
                <GlobalBanSlot />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
