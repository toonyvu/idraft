import Aeroplanist from "@/public/NavAeroplanist.png";
import Image from "next/image";
export default function GlobalBanSlot() {
  return (
    <div className="h-12 w-12 border-2 border-black bg-blue-600">
      <Image src={Aeroplanist} alt="survivor name"></Image>
    </div>
  );
}
