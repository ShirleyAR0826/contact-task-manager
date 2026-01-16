import { prisma } from "../lib/prisma"
import bcrypt from "bcrypt"

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10)

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: passwordHash,
    },
  })

  console.log("Seed user created")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
