import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

type Params = {
  params: { id: string }
}

// UPDATE
export async function PUT(req: Request, { params }: Params) {
  const { name, businessId } = await req.json()

  const person = await prisma.person.update({
    where: { id: Number(params.id) },
    data: {
      name,
      businessId: Number(businessId),
    },
  })

  return NextResponse.json(person)
}

// DELETE
export async function DELETE(_: Request, { params }: Params) {
  await prisma.person.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ success: true })
}
