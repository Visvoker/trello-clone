import { NextResponse } from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/webhook",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  //  未登入 + 嘗試進入私密頁面 → 強制驗證 /sign-in
  if (!userId && !isPublicRoute(req)) {
    await auth.protect();
  }

  // 已登入 + 嘗試進入公開頁（例如 /sign-in） →  自動導向 organization 頁或選擇組織頁
  if (userId && isPublicRoute(req)) {
    const path = orgId ? `/organization/${orgId}` : "/select-org";
    const orgSelection = new URL(path, req.url);

    return NextResponse.redirect(orgSelection);
  }

  // 已登入但尚未選取 orgId→ 強制導向 /select-org
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url);

    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
