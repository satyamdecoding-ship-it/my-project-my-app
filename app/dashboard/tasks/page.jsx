
"use client";

import { useRouter } from "next/navigation";
import { createTask } from "@/app/actions/taskActions";
import "./task.css";

export default function TaskCreatePage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await createTask(formData);
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Task creation failed:", error);
      alert("Failed to create task. Please try again.");
    }
  }

  return (
    <div className="task-page">
      <div className="task-card">
        <h1 className="task-title">Create Task</h1>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            name="title"
            placeholder="Enter Title"
            required
            className="task-input"
          />

          <textarea
            name="description"
            placeholder="Enter Description"
            required
            className="task-textarea"
          />

          <select name="priority" required className="task-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="hidden"
            name="projectId"
            value="69311dffb793bd32bc20c396"
          />

          <button type="submit" className="task-button">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
