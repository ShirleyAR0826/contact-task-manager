import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

// GET all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { businesses: true },
    orderBy: { name: "asc" },
  })
  return NextResponse.json(categories)
}

// CREATE category
export async function POST(req: Request) {
  const { name } = await req.json()

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const category = await prisma.category.create({
    data: { name },
  })

  return NextResponse.json(category, { status: 201 })
}