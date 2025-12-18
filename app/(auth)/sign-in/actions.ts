import { NextResponse } from "next/server";

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const from = formData.get("from")?.toString() || "/dashboard";

  if (email !== "user@example.com" || password !== "password123") {
    return NextResponse.redirect(new URL("/sign-in?error=invalid_credentials", "http://localhost:3000"));
  }

  const response = NextResponse.redirect(new URL(from, "http://localhost:3000"));

  // ✅ Set cookie in response
  response.cookies.set("token", "signed-in-example-token", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
