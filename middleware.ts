// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // read cookie value (Edge runtime)
  const token = req.cookies.get("token")?.value ?? null;
  const pathname = req.nextUrl.pathname;

  // allow public assets and sign-in page
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === "/sign-in"
  ) {
    return NextResponse.next();
  }

  // if trying to open a protected route and not authenticated -> redirect to /sign-in
  const protectedPaths = ["/dashboard", "/projects", "/tasks"];
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isProtected && !token) {
    const signInUrl = new URL("/sign-in", req.url);
    // optional: include original path so you can redirect back after login
    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // if authenticated and trying to go to sign-in, send to dashboard
  if (token && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/projects/:path*", "/projects", "/tasks/:path*", "/tasks"],
};
