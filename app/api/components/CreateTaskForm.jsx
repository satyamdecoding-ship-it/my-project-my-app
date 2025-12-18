import { createTask } from "@/actions/taskActions";

export default function CreateTaskForm({ projectId }) {
  return (
    <form action={createTask} className="space-y-3 border p-4 rounded">

      <input type="hidden" name="projectId" value={projectId} />

      <input
        name="title"
        placeholder="Task Title"
        required
        className="border p-2 w-full"
      />

      <textarea
        name="description"
        placeholder="Task Description"
        className="border p-2 w-full"
      />

      <select name="priority" className="border p-2 w-full">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Task
      </button>

    </form>
  );
}
