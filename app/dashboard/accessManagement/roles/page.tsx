import { getRoles } from "../actions/roles";
import { RolesManagementClient } from "../components/RolesManagementClient";

export default async function RolesPage() {
  const roles = await getRoles();

  return <RolesManagementClient roles={roles} />;
}
