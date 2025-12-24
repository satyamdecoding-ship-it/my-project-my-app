
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value ?? null;
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === "/sign-in"
  ) {
    return NextResponse.next();
  }

  const protectedPaths = ["/dashboard", "/projects", "/tasks"];
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isProtected && !token) {
    const signInUrl = new URL("/sign-in", req.url);

    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

 
  if (token && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/projects/:path*", "/projects", "/tasks/:path*", "/tasks"],
};






