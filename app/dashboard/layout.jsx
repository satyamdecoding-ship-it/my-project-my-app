import Sidebar from "../api/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
