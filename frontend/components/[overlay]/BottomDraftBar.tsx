import LeftDraftPanel from "@/components/[overlay]/LeftDraftPanel";
import RightDraftPanel from "@/components/[overlay]/RightDraftPanel";
import MapDisplay from "@/components/[overlay]/MapDisplay";

export default function BottomDraftBar() {
  return (
    <div className="absolute bottom-0 left-0 h-[27%] w-full bg-gray-700">
      <div className="absolute inset-0 bg-gray-700">
        <div className="absolute left-0 top-0 h-full w-[37%] bg-green-950">
          <LeftDraftPanel />
        </div>
      </div>

      <div className="absolute right-0 top-0 h-full w-[37%] bg-red-950">
        <RightDraftPanel />
      </div>

      <div className="absolute left-1/2 top-0 h-full w-[26%] -translate-x-1/2 bg-purple-950">
        <MapDisplay />
      </div>
    </div>
  );
}
