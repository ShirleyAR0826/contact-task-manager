"use client"

import { useEffect, useState } from "react"

type Business = { id: number; name: string }
type Person = { id: number; name: string; business: Business }
type Task = {
  id: number
  title: string
  completed: boolean
  business?: Business
  person?: Person
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [title, setTitle] = useState("")
  const [businessId, setBusinessId] = useState("")
  const [personId, setPersonId] = useState("")

  async function loadData() {
    const [taskRes, bizRes, peopleRes] = await Promise.all([
      fetch("/api/tasks"),
      fetch("/api/businesses"),
      fetch("/api/people"),
    ])

    setTasks(await taskRes.json())
    setBusinesses(await bizRes.json())
    setPeople(await peopleRes.json())
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault()

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        businessId,
        personId,
      }),
    })

    setTitle("")
    setBusinessId("")
    setPersonId("")
    loadData()
  }

  async function toggleTask(task: Task) {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })

    loadData()
  }

  async function deleteTask(id: number) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    loadData()
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <h1 className="text-xl font-bold">Tasks</h1>

      <form onSubmit={createTask} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={businessId}
          onChange={e => setBusinessId(e.target.value)}
        >
          <option value="">Assign to business (optional)</option>
          {businesses.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={personId}
          onChange={e => setPersonId(e.target.value)}
        >
          <option value="">Assign to person (optional)</option>
          {people.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.business.name})
            </option>
          ))}
        </select>

        <button className="bg-black text-white px-4 py-2 w-full">
          Add Task
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map(t => (
          <li
            key={t.id}
            className="flex justify-between items-center border p-2"
          >
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t)}
                />
                <span className={t.completed ? "line-through" : ""}>
                  {t.title}
                </span>
              </label>
              <div className="text-sm text-gray-500">
                {t.person
                  ? `Person: ${t.person.name}`
                  : t.business
                  ? `Business: ${t.business.name}`
                  : "Unassigned"}
              </div>
            </div>

            <button
              onClick={() => deleteTask(t.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
