// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div style={{ padding: "40px" }}>
      
//       {/* 🔵 Top Navbar */}
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "flex-end",
//           marginBottom: "30px",
//         }}
//       >
//         <Link
//           href="/sign-in"
//           className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
//         >
//           Sign In
//         </Link>
        
//       </div>

//       {/* Main Content */}
//       <div style={{ textAlign: "center" }}>
//         <h1 className="text-3xl font-bold mb-8">Welcome to Real Estate Dashboard</h1>

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             maxWidth: "300px",
//             margin: "0 auto",
//           }}
//         >
//           {/* Dashboard */}
//           <Link
//             href="/dashboard"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Go to Dashboard
//           </Link>

//           {/* Projects */}
//           <Link
//             href="/dashboard/projects"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//           >
//             View Projects
//           </Link>

//           {/* Tasks */}
//           <Link
//             href="/dashboard/tasks"
//             className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//           >
//             Create New Task
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/sign-in");
}
