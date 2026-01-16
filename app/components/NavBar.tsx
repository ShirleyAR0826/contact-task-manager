"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { label: "Task List", href: "/dashboard/tasks" },
  { label: "Contacts", href: "/dashboard/people" },
  { label: "Tags", href: "/dashboard/tags" },
  { label: "Categories", href: "/dashboard/categories" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between py-4">
          
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-xl">🐝</span>
              <span>Task Manager</span>
            </div>

            {/* Nav links */}
            <nav className="flex gap-6">
              {navItems.map(item => {
                const active = pathname.startsWith(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative pb-2 text-sm font-medium ${
                      active
                        ? "text-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}

                    {active && (
                      <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-primary" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right: User */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">Shirley Reyes</span>

            <button
              onClick={logout}
              className="text-gray-500 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
