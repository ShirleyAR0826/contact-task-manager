import React from "react"
import Navbar from "../components/NavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
