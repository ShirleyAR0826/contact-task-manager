import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

type Params = { params: { id: string } }

// UPDATE
export async function PUT(req: Request, { params }: Params) {
  const { name } = await req.json()

  const tag = await prisma.tag.update({
    where: { id: Number(params.id) },
    data: { name },
  })

  return NextResponse.json(tag)
}

// DELETE
export async function DELETE(_: Request, { params }: Params) {
  await prisma.tag.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ success: true })
}
