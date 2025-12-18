import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const email = body.email?.toString().trim() || "";
  const password = body.password?.toString().trim() || "";
  const from = body.from || "/dashboard";

  // ✅ Check credentials
  if (email !== "user@example.com" || password !== "password123") {
    return NextResponse.redirect(
      new URL("/sign-in?error=invalid_credentials", "http://localhost:3000")
    );
  }

  // ✅ Set cookie and redirect
  const res = NextResponse.redirect(new URL(from, "http://localhost:3000"));
  res.cookies.set("token", "signed-in-example-token", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
