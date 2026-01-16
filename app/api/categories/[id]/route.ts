import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

type Params = { params: { id: string } }

// UPDATE
export async function PUT(req: Request, { params }: Params) {
  const { name } = await req.json()

  const category = await prisma.category.update({
    where: { id: Number(params.id) },
    data: { name },
  })

  return NextResponse.json(category)
}

// DELETE
export async function DELETE(_: Request, { params }: Params) {
  await prisma.category.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ success: true })
}