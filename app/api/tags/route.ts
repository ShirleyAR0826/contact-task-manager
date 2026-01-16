import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

// GET all tags
export async function GET() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  })

  return NextResponse.json(tags)
}

// CREATE tag
export async function POST(req: Request) {
  const { name } = await req.json()

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const tag = await prisma.tag.create({
    data: { name },
  })

  return NextResponse.json(tag, { status: 201 })
}
