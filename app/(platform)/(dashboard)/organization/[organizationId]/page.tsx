import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function OrganizationPage() {
  const { orgId } = await auth();

  return (
    <div>
      <p>OrganizationPage</p>
    </div>
  );
}
