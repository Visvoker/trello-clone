import { db } from "./db";

import { auth } from "@clerk/nextjs/server";

const DAY_IN_MS = 86_400_000;

export async function checkSubscription() {
  const { orgId } = await auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  if (
    !orgSubscription.stripePriceId ||
    !orgSubscription.stripeCurrentPeriodEnd
  ) {
    return false;
  }
  const isValid =
    orgSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();
  return isValid;
}
