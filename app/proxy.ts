import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If user is logged in → prevent access to auth pages
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user not logged in → block dashboard access
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// NEW Next.js 14+ required config
export const proxy = {
  "/sign-in": true,
  "/sign-up": true,
  "/verify/:path*": true,
  "/dashboard/:path*": true,
  "/": true
};
