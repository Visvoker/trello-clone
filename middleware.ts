import { NextResponse } from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // 非公開頁面未登入 → 跳轉 sign-in
  if (!userId && !isPublicRoute(req)) {
    await auth.protect();
  }

  // 已登入但在公開頁面 → 自動導向創建團隊頁面
  if (userId && isPublicRoute(req)) {
    const path = orgId ? `/organization/${orgId}` : "/select-org";
    const orgSelection = new URL(path, req.url);

    return NextResponse.redirect(orgSelection);
  }

  // 已登入但尚未選取 orgId→ 自動導向創建團隊頁面
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
