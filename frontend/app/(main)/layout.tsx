import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div>
      <Navbar />
      {children}
    </div>
  );
}
