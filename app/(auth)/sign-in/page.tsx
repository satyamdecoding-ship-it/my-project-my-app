

// "use client";

// import React, { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import "./signIn.css";

// export default function SignInPage({ searchParams }: { searchParams?: { error?: string; from?: string } }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(
//     searchParams?.error === "invalid_credentials" ? "Invalid email or password" : ""
//   );

//   const [username, setUsername] = useState(""); 
//   const from = searchParams?.from || "/dashboard";

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email")?.toString().trim() || "";
//     const password = formData.get("password")?.toString().trim() || "";

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, username, from }),
//       });

//       if (res.redirected) {
//         router.push(`/dashboard?username=${encodeURIComponent(username)}`);
//       } else {
//         setErrorMsg("Invalid email or password");
//       }
//     } catch (err) {
//       setErrorMsg("Something went wrong");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="signin-main">
//       <div className="signin-container">
//         <h1 className="signin-title">Sign In</h1>

//         {errorMsg && <div className="signin-error">{errorMsg}</div>}

//         <form onSubmit={handleLogin}>
//           <input type="hidden" name="from" value={from} />

//           {/* Username */}
//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Username
//               <br />
//               <input
//                 name="username"
//                 type="text"
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="signin-input"
//               />
//             </label>
//           </div>

//           {/* Email */}
//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Email
//               <br />
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="signin-input"
//               />
//             </label>
//           </div>

//           {/* Password */}
//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Password
//               <br />
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 className="signin-input"
//               />
//             </label>
//           </div>

//           {/* Button */}
//           <button type="submit" disabled={loading} className="signin-btn">
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         {/* Footer Info */}
//         <div className="signin-footer">
//           Example credentials: <br />
//           <strong>user@example.com</strong> / <strong>password123</strong>
//         </div>
//       </div>
//     </main>
//   );
// }




"use client";

import React, { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./signIn.css";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ use hook
  const errorParam = searchParams.get("error"); // ✅ get query param
  const fromParam = searchParams.get("from") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    errorParam === "invalid_credentials" ? "Invalid email or password" : ""
  );

  const [username, setUsername] = useState(""); 
  const from = fromParam;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, from }),
      });

      if (res.redirected) {
        router.push(`/dashboard?username=${encodeURIComponent(username)}`);
      } else {
        setErrorMsg("Invalid email or password");
      }
    } catch (err) {
      setErrorMsg("Something went wrong");
      console.error(err);
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
          <input type="hidden" name="from" value={from} />

          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label>
              Username
              <br />
              <input
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="signin-input"
              />
            </label>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label>
              Email
              <br />
              <input
                name="email"
                type="email"
                required
                className="signin-input"
              />
            </label>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label>
              Password
              <br />
              <input
                name="password"
                type="password"
                required
                className="signin-input"
              />
            </label>
          </div>

          {/* Button */}
          <button type="submit" disabled={loading} className="signin-btn">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Info */}
        <div className="signin-footer">
          Example credentials: <br />
          <strong>user@example.com</strong> / <strong>password123</strong>
        </div>
      </div>
    </main>
  );
}

