"use server";

import dbConnect from "@/app/lib/dbConnect";
import Task from "@/app/model/Task";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

/* CREATE */
export async function createTask(formData: FormData) {
  await dbConnect();

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const projectId = formData.get("projectId")?.toString();
  const priority = formData.get("priority")?.toString()?.toLowerCase();

  if (!title || !description || !projectId || !priority) {
    throw new Error("All fields are required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID");
  }

  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    throw new Error("Invalid priority value");
  }

  const task = await Task.create({
    title,
    description,
    projectId: new mongoose.Types.ObjectId(projectId),
    priority,
  });

  return JSON.parse(JSON.stringify(task));
}

/* GET TASKS */
export async function getProjectTasks(projectId: string) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID");
  }

  const tasks = await Task.find({
    projectId: new mongoose.Types.ObjectId(projectId),
  })
    .sort({ createdAt: -1 })
    .lean();

  return tasks;
}

/* GET SINGLE */
export async function getTaskById(id: string) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Task ID");
  }

  const task = await Task.findById(id).lean();

  if (!task) {
    throw new Error("Task not found");
  }

  return JSON.parse(JSON.stringify(task));
}

/* DELETE */
export async function deleteTask(taskId: string) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid Task ID");
  }

  await Task.findByIdAndDelete(taskId);
  revalidatePath("/dashboard/projects");

  return { success: true };
}

/* UPDATE */
export async function updateTask(id: string, data: any) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Task ID");
  }

  if (data.priority) {
    data.priority = data.priority.toLowerCase();

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(data.priority)) {
      throw new Error("Invalid priority value");
    }
  }

  const updated = await Task.findByIdAndUpdate(id, data, { new: true });

  return JSON.parse(JSON.stringify(updated));
}
