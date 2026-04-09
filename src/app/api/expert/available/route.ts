import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const experts = await prisma.expert.findMany({
      where: { status: "APPROVED", isAvailable: true },
      include: {
        user: { select: { id: true, name: true, email: true, image: true, reputation: true } },
      },
      orderBy: { earnings: "desc" },
    })
    return NextResponse.json({ experts })
  } catch {
    return NextResponse.json({ error: "Failed to fetch experts" }, { status: 500 })
  }
}
