import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl?.pathname;

  // 🔒 BUILD-SAFE GUARD (VERY IMPORTANT)
  if (!pathname) {
    return NextResponse.next();
  }

  // allow public & system routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === "/sign-in"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value ?? null;

  const protectedPaths = ["/dashboard", "/projects", "/tasks"];
  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isProtected && !token) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/projects/:path*",
    "/projects",
    "/tasks/:path*",
    "/tasks",
  ],
};
