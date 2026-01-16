"use client"

import { useEffect, useState } from "react"

type Business = { id: number; name: string }
type Person = { id: number; name: string }
type Task = {
  id: number
  title: string
  completed: boolean
  business?: Business
  person?: Person
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  async function loadTasks() {
    const res = await fetch("/api/tasks")
    setTasks(await res.json())
  }

  async function toggleTask(task: Task) {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })
    loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const openTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  function renderFor(task: Task) {
    if (task.person) return `👤 ${task.person.name}`
    if (task.business) return `🏢 ${task.business.name}`
    return "—"
  }

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-xl font-bold">Tasks</h1>

      {/* OPEN TASKS */}
      <section>
        <h2 className="font-semibold mb-4">Open Tasks List</h2>

        <table className="w-full border">
          <thead className="bg-blue-200">
            <tr>
              <th className="p-2 text-left">Task Name</th>
              <th className="p-2 text-left">For</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {openTasks.map(task => (
              <tr key={task.id} className="border-t">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{renderFor(task)}</td>
                <td className="p-2">Open</td>
                <td className="p-2">
                  <button
                    onClick={() => toggleTask(task)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* COMPLETED TASKS */}
      <section>
        <h2 className="font-semibold mb-4">Completed Tasks List</h2>

        <table className="w-full border">
          <thead className="bg-blue-200">
            <tr>
              <th className="p-2 text-left">Task Name</th>
              <th className="p-2 text-left">For</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map(task => (
              <tr key={task.id} className="border-t">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{renderFor(task)}</td>
                <td className="p-2">Completed</td>
                <td className="p-2">
                  <button
                    onClick={() => toggleTask(task)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Re-open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
