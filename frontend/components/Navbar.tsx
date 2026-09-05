"use client";

import { logout } from "@/api/logout";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await logout();
    console.log(res);
    router.push("/login");
  };

  return (
    <div className="w-full h-15 flex flex-row bg-gren-400">
      <div className="bg-green-400 w-full h-full flex flex-row gap-4 p-2">
        <button
          className="bg-orange-200 hover:bg-amber-600 transition duration-100 w-30"
          onClick={() => {
            router.push("/tournaments");
          }}
        >
          Tournaments
        </button>
        <button
          className="bg-orange-200 hover:bg-amber-600 transition duration-100 w-30"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
