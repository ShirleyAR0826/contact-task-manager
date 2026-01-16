import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

type Params = {
  params: { id: string }
}

// UPDATE task
export async function PUT(req: Request, { params }: Params) {
  const { title, completed } = await req.json()

  const task = await prisma.task.update({
    where: { id: Number(params.id) },
    data: { title, completed },
  })

  return NextResponse.json(task)
}

// DELETE task
export async function DELETE(_: Request, { params }: Params) {
  await prisma.task.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ success: true })
}
