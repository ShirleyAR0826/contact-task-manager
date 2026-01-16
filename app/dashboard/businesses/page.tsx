"use client"

import { useEffect, useState } from "react"

type Business = {
  id: number
  name: string
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [name, setName] = useState("")

  async function loadBusinesses() {
    const res = await fetch("/api/businesses")
    const data = await res.json()
    setBusinesses(data)
  }

  async function createBusiness(e: React.FormEvent) {
    e.preventDefault()

    await fetch("/api/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    setName("")
    loadBusinesses()
  }

  async function deleteBusiness(id: number) {
    await fetch(`/api/businesses/${id}`, { method: "DELETE" })
    loadBusinesses()
  }

  useEffect(() => {
    loadBusinesses()
  }, [])

  return (
    <div className="p-8 max-w-xl space-y-6">
      <h1 className="text-xl font-bold">Businesses</h1>

      <form onSubmit={createBusiness} className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Business name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="bg-black text-white px-4">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {businesses.map(b => (
          <li
            key={b.id}
            className="flex justify-between border p-2"
          >
            {b.name}
            <button
              onClick={() => deleteBusiness(b.id)}
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
