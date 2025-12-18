import "./workspaces.css";

export default function WorkspacesPage() {
  return (
    <div className="workspace-wrapper">
      <div className="workspace-card">
        <h1 className="workspace-title">Workspaces</h1>
        <p className="workspace-subtitle">
          Follow these simple steps to manage your tasks efficiently
        </p>

        <hr className="divider" />

        <div className="steps">
          <div className="step">
            <span className="step-number">Step 1</span>
            <h2>Go to the Task Page</h2>
            <p>Navigate to the task section from the dashboard.</p>
          </div>

          <div className="step">
            <span className="step-number">Step 2</span>
            <h2>Create and Save Your Task</h2>
            <p>Add task details and save it securely.</p>
          </div>

          <div className="step result">
            <span className="step-number">Result</span>
            <h2>Task Added to Project</h2>
            <p>
              You will automatically be redirected to the Project page with
              your newly created task.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
