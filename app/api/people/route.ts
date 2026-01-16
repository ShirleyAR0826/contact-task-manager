import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

// GET all people
export async function GET() {
  const people = await prisma.person.findMany({
    include: { business: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(people)
}

// CREATE person
export async function POST(req: Request) {
  const { name, businessId } = await req.json()

  if (!name || !businessId) {
    return NextResponse.json(
      { error: "Name and business are required" },
      { status: 400 }
    )
  }

  const person = await prisma.person.create({
    data: {
      name,
      businessId: Number(businessId),
    },
  })

  return NextResponse.json(person, { status: 201 })
}
