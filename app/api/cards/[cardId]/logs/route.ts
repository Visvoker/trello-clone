import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ENTITY_TYPE } from "@/lib/generated/prisma";

import { db } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: { cardId: string } }
) {
  try {
    const { cardId } = context.params;
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    if (auditLogs.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(auditLogs);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
