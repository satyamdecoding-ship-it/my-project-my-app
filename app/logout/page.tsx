"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
   
    localStorage.removeItem("username"); 
   
    router.push("/sign-in");
  }, []);

  return
  <>
  <h1>Logging out ...</h1>
</>
}
