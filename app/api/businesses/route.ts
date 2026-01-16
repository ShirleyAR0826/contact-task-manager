import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

// GET all businesses
export async function GET() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(businesses)
}

// CREATE business
export async function POST(req: Request) {
  const { name } = await req.json()

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    )
  }

  const business = await prisma.business.create({
    data: { name },
  })

  return NextResponse.json(business, { status: 201 })
}