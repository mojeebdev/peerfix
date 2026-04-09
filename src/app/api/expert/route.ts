import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { github, bio, expertise, yearsExp, hourlyRate, walletAddress } = await req.json()

    const existing = await prisma.expert.findUnique({ where: { userId: session.user.id } })
    if (existing) return NextResponse.json({ error: "Already applied" }, { status: 400 })

    const expert = await prisma.expert.create({
      data: {
        userId: session.user.id,
        github,
        bio,
        expertise,
        yearsExp: parseInt(yearsExp),
        hourlyRate: parseFloat(hourlyRate),
        walletAddress: walletAddress || null,
      },
    })

    return NextResponse.json({ expert }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const experts = await prisma.expert.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, image: true, reputation: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ experts })
  } catch {
    return NextResponse.json({ error: "Failed to fetch experts" }, { status: 500 })
  }
}
