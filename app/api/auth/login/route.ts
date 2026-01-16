import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import bcrypt from "bcrypt"

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    )
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  const { SignJWT } = await import("jose")

  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret)

  const res = NextResponse.json({ success: true })

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })

  return res
}
