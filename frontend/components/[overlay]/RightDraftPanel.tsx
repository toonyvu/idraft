import Image from "next/image";
import Cueist from "@/public/Cueist.png";

export default function RightDraftPanel() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute right-2 bottom-[calc(100%+16px)] flex gap-5">
        <div className="w-12 h-12 bg-blue-600 border-2">1</div>
        <div className="w-12 h-12 bg-blue-600 border-2">2</div>
        <div className="w-12 h-12 bg-blue-600 border-2">3</div>
        <div className="w-12 h-12 bg-blue-600 border-2">4</div>
      </div>
      <div className="absolute inset-x-0 top-0 bottom-[15%] overflow-hidden bg-lime-500">
        <Image
          src={Cueist}
          width={250}
          height={250}
          alt="Hello"
          className="absolute top-0 left-1/2 -translate-x-1/2"
        />
      </div>

      <div className="absolute left-0 bottom-0 h-[15%] bg-pink-400 w-full">
        1
      </div>
    </div>
  );
}
