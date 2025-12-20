

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

      <h1 className="page-title">Project Tasks</h1>

  
      {tasks.length === 0 && (
        <p className="empty-text">No tasks found</p>
      )}

  
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
         
          <h2 className="task-title">
            Title: {task.title}
          </h2>

       
          <p className="task-desc">
            <strong>Description:</strong> {task.description}
          </p>

       
          <div className="priority-wrapper">
            <span className={getPriorityClass(task.priority)}>
              Priority: {task.priority}
            </span>
          </div>

        
          <div className="action-buttons">
      
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
