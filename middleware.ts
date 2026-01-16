import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const { jwtVerify } = await import("jose")
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

