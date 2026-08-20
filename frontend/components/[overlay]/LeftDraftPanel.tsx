import LuckyGuy from "@/public/LuckyGuy.png";
import Cheerleader from "@/public/Cheerleader.png";
import GraveKeeper from "@/public/GraveKeeper.png";
import Composer from "@/public/Composer.png";

import Image from "next/image";

export default function LeftDraftPanel() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-2 bottom-[calc(100%+16px)] flex gap-5">
        <div className="w-12 h-12 bg-blue-600 border-2">1</div>
        <div className="w-12 h-12 bg-blue-600 border-2">2</div>
      </div>

      <div className="absolute inset-0 grid grid-cols-4">
        <div className="bg-orange-500">
          <Image src={LuckyGuy} alt="Lucky Guy"></Image>
        </div>
        <div className="bg-orange-500">
          <Image src={Cheerleader} alt="Lucky Guy"></Image>
        </div>
        <div className="bg-orange-500">
          <Image src={GraveKeeper} alt="Lucky Guy"></Image>
        </div>
        <div className="bg-orange-500">
          <Image src={Composer} alt="Lucky Guy"></Image>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 grid grid-cols-4 h-[15%] w-full">
        <div className="bg-pink-400">1</div>
        <div className="bg-pink-400">1</div>
        <div className="bg-pink-400">1</div>
        <div className="bg-pink-400">1</div>
      </div>
    </div>
  );
}
