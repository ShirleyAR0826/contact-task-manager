"use client"

import { useEffect, useState } from "react"

type Category = {
  id: number
  name: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")

  async function loadCategories() {
    const res = await fetch("/api/categories")
    setCategories(await res.json())
  }

  async function createCategory(e: React.FormEvent) {
    e.preventDefault()

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    setName("")
    loadCategories()
  }

  async function deleteCategory(id: number) {
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    loadCategories()
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <div className="p-8 max-w-md space-y-6">
      <h1 className="text-xl font-bold">Categories</h1>

      <form onSubmit={createCategory} className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="bg-black text-white px-4">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {categories.map(c => (
          <li
            key={c.id}
            className="flex justify-between border p-2"
          >
            {c.name}
            <button
              onClick={() => deleteCategory(c.id)}
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
