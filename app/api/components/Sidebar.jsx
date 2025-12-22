"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Workspaces", href: "/dashboard/workspaces" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Tasks", href: "/dashboard/tasks" },
  ];

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <aside className="w-64 bg-white border-r p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-6">My Dashboard</h1>

      <nav className="flex-1">
        {menu.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md mb-2 transition
                ${
                  isActive
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t pt-4">
        <Link
          href="/dashboard/settings"
          className={`block px-3 py-2 mb-2 rounded-md transition
            ${
              pathname === "/dashboard/settings"
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }
          `}
        >
          Settings
        </Link>

        <button
          onClick={handleLogout}
          className="mt-3 px-6 py-2 font-bold border-2 border-black rounded-md hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
