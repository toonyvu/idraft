import GameRows from "@/components/[overlay]/GameRows";
import BottomDraftBar from "@/components/[overlay]/BottomDraftBar";

export default function OverlayPage() {
  const bestOf = 5;
  return (
    <div className="relative h-screen w-full overflow-hidden bg-amber-50">
      <GameRows bestOf={bestOf} side="left"></GameRows>
      <GameRows bestOf={bestOf} side="right"></GameRows>
      <BottomDraftBar />
    </div>
  );
}
