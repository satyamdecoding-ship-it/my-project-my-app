
// "use client";

// import React, { FormEvent, useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import "./signIn.css";


// function SignInContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const errorParam = searchParams.get("error");

//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(
//     errorParam === "invalid_credentials" ? "Invalid email or password" : ""
//   );

//   const [username, setUsername] = useState("");

//   const handleLogin = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email")?.toString().trim();
//     const password = formData.get("password")?.toString().trim();

  
//     if (email === "user@example.com" && password === "password123") {
//       router.push(
//         `/dashboard?username=${encodeURIComponent(username || "User")}`
//       );
//     } else {
//       setErrorMsg("Invalid email or password");
//     }

//     setLoading(false);
//   };

//   return (
//     <main className="signin-main">
//       <div className="signin-container">
//         <h1 className="signin-title">Sign In</h1>

//         {errorMsg && <div className="signin-error">{errorMsg}</div>}

//         <form onSubmit={handleLogin}>
         
//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Username
//               <input
//                 type="text"
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="signin-input"
//               />
//             </label>
//           </div>

 
//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Email
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="signin-input"
//               />
//             </label>
//           </div>

     
//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Password
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 className="signin-input"
//               />
//             </label>
//           </div>

//           <button type="submit" disabled={loading} className="signin-btn">
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <div className="signin-footer">
//           Example credentials:
//           <br />
//           <strong>user@example.com</strong> / <strong>password123</strong>
//         </div>
//       </div>
//     </main>
//   );
// }


// export default function SignInPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <SignInContent />
//     </Suspense>
//   );
// }






"use client";

import React, { FormEvent, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import "./signIn.css";

function SignInContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Login failed");
      } else {
        router.push(`/dashboard`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signin-main">
      <div className="signin-container">
        <h1 className="signin-title">Sign In</h1>

        {errorMsg && <div className="signin-error">{errorMsg}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label>
              Email
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signin-input"
              />
            </label>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>
              Password
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signin-input"
              />
            </label>
          </div>

          <button type="submit" disabled={loading} className="signin-btn">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
