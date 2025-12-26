import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl?.pathname;

  // VERY IMPORTANT: if pathname is undefined, allow request
  if (!pathname) {
    return NextResponse.next();
  }

  // Allow public & API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === "/sign-in"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard", "/projects", "/tasks"];
  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/tasks/:path*"],
};
