import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/lib/utils"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const helpType = searchParams.get("helpType")
    const status = searchParams.get("status")
    const tag = searchParams.get("tag")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = 20

    const problems = await prisma.problem.findMany({
      where: {
        ...(helpType && { helpType: helpType as any }),
        ...(status && { status: status as any }),
        ...(tag && { tags: { has: tag } }),
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
        _count: { select: { responses: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json({ problems })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { title, description, helpType, tags, budget } = body

    const slug = generateSlug(title)

    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        helpType,
        tags: tags || [],
        budget: budget || null,
        slug,
        authorId: session.user.id,
      },
    })

    return NextResponse.json({ problem }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 })
  }
}
