"use client"

import { useEffect, useState } from "react"

type Business = {
  id: number
  name: string
}

type Person = {
  id: number
  name: string
  business: Business
}

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [name, setName] = useState("")
  const [businessId, setBusinessId] = useState("")

  async function loadData() {
    const [peopleRes, businessRes] = await Promise.all([
      fetch("/api/people"),
      fetch("/api/businesses"),
    ])

    setPeople(await peopleRes.json())
    setBusinesses(await businessRes.json())
  }

  async function createPerson(e: React.FormEvent) {
    e.preventDefault()

    await fetch("/api/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, businessId }),
    })

    setName("")
    setBusinessId("")
    loadData()
  }

  async function deletePerson(id: number) {
    await fetch(`/api/people/${id}`, { method: "DELETE" })
    loadData()
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="p-8 max-w-xl space-y-6">
      <h1 className="text-xl font-bold">People</h1>

      <form onSubmit={createPerson} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={businessId}
          onChange={e => setBusinessId(e.target.value)}
        >
          <option value="">Select business</option>
          {businesses.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <button className="bg-black text-white px-4 py-2 w-full">
          Add Person
        </button>
      </form>

      <ul className="space-y-2">
        {people.map(p => (
          <li
            key={p.id}
            className="flex justify-between border p-2"
          >
            <div>
              {p.name}
              <div className="text-sm text-gray-500">
                {p.business.name}
              </div>
            </div>
            <button
              onClick={() => deletePerson(p.id)}
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
