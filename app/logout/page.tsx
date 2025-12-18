"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear session/localStorage or cookies
    localStorage.removeItem("username"); // example
    // Redirect to Sign-In page
    router.push("/sign-in");
  }, []);

  return
  <>
  <h1>Logging out ...</h1>
</>
}
