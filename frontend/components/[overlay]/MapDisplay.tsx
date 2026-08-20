import Image from "next/image";
import EversleepingTown from "@/public/EversleepingTown.jpg";
import T1 from "@/public/T1.png";
import G2 from "@/public/G2.png";

export default function MapDisplay() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image src={EversleepingTown} alt="" fill className="object-cover" />

      {/* Tournament information */}
      <div className="absolute inset-x-0 top-2 text-center text-white">
        <p className="text-sm font-bold">Tournament Name</p>
        <p className="text-xs font-semibold">Game 1, First Half</p>
      </div>

      {/* Left team */}
      <div className="absolute bottom-15 left-12 flex flex-col items-center">
        <div className="relative h-15 w-15">
          <Image src={T1} alt="Team A" fill className="object-contain" />
        </div>

        <span className="text-md font-bold text-white">0</span>

        <span className="text-xs font-bold text-white">W0 DO L0</span>
      </div>

      {/* Right team */}
      <div className="absolute right-12 bottom-15 flex flex-col items-center">
        <div className="relative h-15 w-15">
          <Image src={G2} alt="Team B" fill className="object-contain" />
        </div>

        <span className="text-md font-bold text-white">0</span>

        <span className="text-xs font-bold text-white">W0 DO L0</span>
      </div>
    </div>
  );
}
