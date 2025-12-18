
// "use client";

// import React, { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignInPage({ searchParams }: { searchParams?: { error?: string; from?: string } }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(
//     searchParams?.error === "invalid_credentials" ? "Invalid email or password" : ""
//   );

//   const [username, setUsername] = useState(""); // ✅ Username state

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
//         body: JSON.stringify({ email, password, username, from }), // ✅ send username
//       });

//       if (res.redirected) {
//         // redirect with username as query param
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
//     <main
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         background: "#f5f5f5",
//       }}
//     >
//       <div
//         style={{
//           width: 420,
//           border: "1px solid #ddd",
//           padding: 32,
//           borderRadius: 12,
//           background: "white",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h1 style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
//           Sign In
//         </h1>

//         {errorMsg && (
//           <div style={{ color: "red", marginBottom: 12, fontSize: 14, textAlign: "center" }}>
//             {errorMsg}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <input type="hidden" name="from" value={from} />

//           {/* ✅ Username Input */}
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
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   borderRadius: 8,
//                   border: "1px solid #ccc",
//                   marginTop: 6,
//                   background: "white",
//                   color: "#000",
//                 }}
//               />
//             </label>
//           </div>

//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Email
//               <br />
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   borderRadius: 8,
//                   border: "1px solid #ccc",
//                   marginTop: 6,
//                   background: "white",
//                   color: "#000",
//                 }}
//               />
//             </label>
//           </div>

//           <div style={{ marginBottom: 16 }}>
//             <label>
//               Password
//               <br />
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 style={{
//                   width: "100%",
//                   padding: 10,
//                   borderRadius: 8,
//                   border: "1px solid #ccc",
//                   marginTop: 6,
//                   background: "white",
//                   color: "#000",
//                 }}
//               />
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: 12,
//               background: "white",
//               border: "2px solid black",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: "bold",
//               fontSize: 16,
//             }}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <div style={{ marginTop: 20, color: "#666", fontSize: 14, textAlign: "center" }}>
//           Example credentials: <br />
//           <strong>user@example.com</strong> / <strong>password123</strong>
//         </div>
//       </div>
//     </main>
//   );
// }




"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "./signIn.css";

export default function SignInPage({ searchParams }: { searchParams?: { error?: string; from?: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    searchParams?.error === "invalid_credentials" ? "Invalid email or password" : ""
  );

  const [username, setUsername] = useState(""); 
  const from = searchParams?.from || "/dashboard";

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
