import TournamentSidebar from "@/components/[sidebars]/TournamentSidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TournamentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/login");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row">
      <div className="w-[20%]">
        <TournamentSidebar id={Number(id)} />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
