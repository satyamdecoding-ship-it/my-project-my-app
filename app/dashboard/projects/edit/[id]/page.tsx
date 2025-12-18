import { getTaskById, updateTask } from "@/app/actions/taskActions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // ensures server fetch every time

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTaskPage(props: EditPageProps) {
  // ✅ unwrap params promise
  const { id: taskId } = await props.params;

  if (!taskId) return <p>Task ID is missing!</p>;

  // ✅ fetch task from DB
  const task = await getTaskById(taskId);

  // ✅ server action to update task
  async function handleUpdateTask(formData: FormData) {
    "use server"; // Important for Next.js server action

    const updatedData = {
      title: formData.get("title")?.toString(),
      description: formData.get("description")?.toString(),
      priority: formData.get("priority")?.toString(),
    };

    await updateTask(taskId, updatedData);

    // revalidate the projects page so changes appear immediately
    revalidatePath("/dashboard/projects");

    // optional: redirect back to projects page after update
    redirect("/dashboard/projects");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Task</h1>

      <form action={handleUpdateTask}>
        <input
          type="text"
          name="title"
          defaultValue={task.title}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          defaultValue={task.description}
          className="border p-2 w-full mt-3"
        />

        <select
          name="priority"
          defaultValue={task.priority}
          className="border p-2 w-full mt-3"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Update Task
        </button>
      </form>
    </div>
  );
}
