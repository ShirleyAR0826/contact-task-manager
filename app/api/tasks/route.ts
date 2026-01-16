import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

// GET all tasks
export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      business: true,
      person: {
        include: { business: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(tasks)
}

// CREATE task
export async function POST(req: Request) {
  const { title, businessId, personId } = await req.json()

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    )
  }

  const task = await prisma.task.create({
    data: {
      title,
      businessId: businessId ? Number(businessId) : null,
      personId: personId ? Number(personId) : null,
    },
  })

  return NextResponse.json(task, { status: 201 })
}