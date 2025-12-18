
// import "./projects.css";
// import { getProjectTasks, deleteTask } from "@/app/actions/taskActions";

// export default async function ProjectsPage() {
//   const projectId = "69311dffb793bd32bc20c396";

//   let tasks = [];

//   try {
//     tasks = await getProjectTasks(projectId);
//   } catch (error) {
//     console.error("Failed to fetch tasks:", error);
//   }

//   // Priority color helper
//   const getPriorityStyle = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case "high":
//         return { background: "#fee2e2", color: "#b91c1c" };
//       case "medium":
//         return { background: "#fef3c7", color: "#92400e" };
//       case "low":
//         return { background: "#dcfce7", color: "#166534" };
//       default:
//         return { background: "#e5e7eb", color: "#374151" };
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "24px",
//         minHeight: "100vh",
//         fontFamily: "Inter, sans-serif",

//         /* ⭐ BEST BACKGROUND (Basic + Special) */
//         background: "linear-gradient(180deg, #f8f9fc 0%, #eef2ff 100%)",
//       }}
//     >
//       {/* PAGE TITLE */}
//       <h1
//         style={{
//           fontSize: "2.2rem",
//           fontWeight: "700",
//           marginBottom: "24px",
//           color: "#111827",
//           borderBottom: "3px solid #4f46e5",
//           display: "inline-block",
//           paddingBottom: "6px",
//         }}
//       >
//         Project Tasks
//       </h1>

//       {/* EMPTY STATE */}
//       {tasks.length === 0 && (
//         <p style={{ color: "#6b7280", marginTop: "20px" }}>
//           No tasks found
//         </p>
//       )}

//       {/* TASK LIST */}
//       {tasks.map((task) => (
//         <div
//           key={task._id}
//           style={{
//             background: "#ffffff",
//             padding: "16px",
//             marginTop: "16px",
//             borderRadius: "12px",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
//             border: "1px solid #e5e7eb",
//           }}
//         >
//           {/* TASK TITLE */}
//           <h2
//             style={{
//               fontSize: "1.4rem",
//               fontWeight: "600",
//               marginBottom: "6px",
//               color: "#1f2937",
//             }}
//           >
//             Title: {task.title}
//           </h2>

//           {/* DESCRIPTION */}
//           <p
//             style={{
//               fontSize: "0.95rem",
//               color: "#4b5563",
//               marginBottom: "10px",
//               lineHeight: "1.6",
//             }}
//           >
//             <strong style={{ color: "#111827" }}>Description:</strong>{" "}
//             {task.description}
//           </p>

//           {/* PRIORITY */}
//           <div style={{ marginBottom: "14px" }}>
//             <span
//               style={{
//                 ...getPriorityStyle(task.priority),
//                 padding: "4px 12px",
//                 borderRadius: "999px",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//               }}
//             >
//               Priority: {task.priority}
//             </span>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div style={{ display: "flex", gap: "10px" }}>
//             {/* DELETE */}
//             <form
//               action={async () => {
//                 "use server";
//                 await deleteTask(task._id);
//               }}
//             >
//               <button
//                 style={{
//                   background: "#ef4444",
//                   color: "#ffffff",
//                   padding: "6px 16px",
//                   borderRadius: "6px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 DELETE
//               </button>
//             </form>

//             {/* EDIT */}
//             <a
//               href={`/dashboard/projects/edit/${task._id}`}
//               style={{
//                 background: "#4f46e5",
//                 color: "#ffffff",
//                 padding: "6px 16px",
//                 borderRadius: "6px",
//                 textDecoration: "none",
//               }}
//             >
//               EDIT
//             </a>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }





import "./projects.css";
import { getProjectTasks, deleteTask } from "@/app/actions/taskActions";

export default async function ProjectsPage() {
  const projectId = "69311dffb793bd32bc20c396";

  let tasks = [];

  try {
    tasks = await getProjectTasks(projectId);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }

  // Priority color helper
  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "priority high";
      case "medium":
        return "priority medium";
      case "low":
        return "priority low";
      default:
        return "priority";
    }
  };

  return (
    <div className="workspace-container">
      {/* PAGE TITLE */}
      <h1 className="page-title">Project Tasks</h1>

      {/* EMPTY STATE */}
      {tasks.length === 0 && (
        <p className="empty-text">No tasks found</p>
      )}

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          {/* TASK TITLE */}
          <h2 className="task-title">
            Title: {task.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="task-desc">
            <strong>Description:</strong> {task.description}
          </p>

          {/* PRIORITY */}
          <div className="priority-wrapper">
            <span className={getPriorityClass(task.priority)}>
              Priority: {task.priority}
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="action-buttons">
            {/* DELETE */}
            <form
              action={async () => {
                "use server";
                await deleteTask(task._id);
              }}
            >
              <button className="btn delete-btn">
                DELETE
              </button>
            </form>

            {/* EDIT */}
            <a
              href={`/dashboard/projects/edit/${task._id}`}
              className="btn edit-btn"
            >
              EDIT
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
