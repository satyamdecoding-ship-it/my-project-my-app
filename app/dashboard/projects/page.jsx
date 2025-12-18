





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
