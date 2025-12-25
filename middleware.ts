import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  try {
    const pathname = req.nextUrl?.pathname ?? "";

    // Always allow API routes (prevents build crash)
    if (pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    // Allow Next.js system files
    if (
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico" ||
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
  } catch {
    // 💣 SAFETY NET — NEVER CRASH BUILD
    return NextResponse.next();
  }
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
