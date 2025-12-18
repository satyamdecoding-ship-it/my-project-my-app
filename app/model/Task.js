import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
