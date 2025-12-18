import { getProjectTasks } from "@/actions/taskActions";

export default async function ProjectTaskList({ projectId }) {
  const tasks = await getProjectTasks(projectId);

  return (
    <div className="mt-6 space-y-3">
      {tasks.map((task) => (
        <div key={task._id} className="border p-3 rounded">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
        </div>
      ))}
    </div>
  );
}
