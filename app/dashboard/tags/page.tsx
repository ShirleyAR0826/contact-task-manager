"use client"

import { useEffect, useState } from "react"

type Tag = {
  id: number
  name: string
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [name, setName] = useState("")

  async function loadTags() {
    const res = await fetch("/api/tags")
    setTags(await res.json())
  }

  async function createTag(e: React.FormEvent) {
    e.preventDefault()

    await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    setName("")
    loadTags()
  }

  async function deleteTag(id: number) {
    await fetch(`/api/tags/${id}`, { method: "DELETE" })
    loadTags()
  }

  useEffect(() => {
    loadTags()
  }, [])

  return (
    <div className="p-8 max-w-md space-y-6">
      <h1 className="text-xl font-bold">Tags</h1>

      <form onSubmit={createTag} className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Tag name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="bg-black text-white px-4">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tags.map(t => (
          <li
            key={t.id}
            className="flex justify-between border p-2"
          >
            {t.name}
            <button
              onClick={() => deleteTag(t.id)}
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
