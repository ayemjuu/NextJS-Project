// app/dashboard/layout.tsx (SERVER component)
import { getCurrentUserWithDetails } from "@/lib/auth";
import LogoutButton from "../../components/LogoutButton";
import Sidebar from "./sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserWithDetails();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - completely fixed, no scroll */}
      <div className="w-64 shrink-0">
        <Sidebar user={user} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header - fixed */}
        <header className="h-14 border-b bg-white px-6 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-medium">Dashboard</h1>
        </header>

        {/* Main - ONLY scrollable part */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
