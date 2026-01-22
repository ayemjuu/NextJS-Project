import { getCurrentUser, getCurrentUserWithDetails } from "@/lib/auth";

export default async function RoleManagementPage() {
  const user = await getCurrentUserWithDetails();
  const userSession = await getCurrentUser();

  // export async function getCurrentUserWithDetails() {
  console.log("userSession :", userSession);

  console.log("Current User:", user?.fullName);
  return (
    <div>
      <h1 className="text-xl font-semibold">Role Management</h1>
      <p className="text-muted-foreground mt-2">
        Manage roles and permissions here.
      </p>
    </div>
  );
}
