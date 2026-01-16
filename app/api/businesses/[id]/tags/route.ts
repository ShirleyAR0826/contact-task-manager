import { NextResponse } from "next/server"
import { prisma } from "../../../../../lib/prisma"

type Params = { params: { id: string } }

export async function PUT(req: Request, { params }: Params) {
  const { tagIds } = await req.json()

  const business = await prisma.business.update({
    where: { id: Number(params.id) },
    data: {
      tags: {
        set: tagIds.map((id: number) => ({ id })),
      },
    },
    include: { tags: true },
  })

  return NextResponse.json(business)
}
