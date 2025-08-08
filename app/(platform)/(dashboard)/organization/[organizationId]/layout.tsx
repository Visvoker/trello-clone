import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";

import OrgControl from "./_components/org-control";

export async function generateMetadata() {
  const { orgSlug } = await auth();

  return {
    title: startCase(orgSlug || "Organization"),
  };
}

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  );
}
