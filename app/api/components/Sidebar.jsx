"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";



export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = function(){
    router.push("/logout")
  }

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Workspaces", href: "/dashboard/workspaces" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Tasks", href: "/dashboard/tasks" },
  ];

  return (
    <aside className="w-64 bg-white border-r p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-6">My Dashboard</h1>

      <nav className="flex-1">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-3 py-2 rounded-md mb-2
              ${pathname === item.href ? "bg-gray-200 font-semibold" : ""}
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t pt-4">
        <Link href="/dashboard/settings" className="block px-3 py-2 mb-2">
          Settings
        </Link>
        
        <button
            onClick={handleLogout}
            style={{
              // alignSelf: "center",
              padding: "10px 24px",
              fontSize: 16,
              fontWeight: "bold",
              borderRadius: 8,
              border: "2px solid black",
              // background: "skyblue",
              cursor: "pointer",
              marginTop: 10,
            }}
          >
            Logout
          </button>
        
      </div>
    </aside>
  );
}
