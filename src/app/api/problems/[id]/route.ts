import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const problemNumber = parseInt(params.id)

    const problem = await prisma.problem.findUnique({
      where: { problemNumber },
      include: {
        author: { select: { id: true, name: true, image: true, reputation: true } },
        responses: {
          include: {
            author: { select: { id: true, name: true, image: true, reputation: true } },
          },
          orderBy: [{ isAccepted: "desc" }, { createdAt: "asc" }],
        },
        payment: true,
      },
    })

    if (!problem) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await prisma.problem.update({
      where: { id: problem.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ problem })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch problem" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const problemNumber = parseInt(params.id)

    const problem = await prisma.problem.findUnique({ where: { problemNumber } })
    if (!problem) return NextResponse.json({ error: "Not found" }, { status: 404 })
    if (problem.authorId !== session.user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const updated = await prisma.problem.update({
      where: { problemNumber },
      data: body,
    })

    return NextResponse.json({ problem: updated })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update problem" }, { status: 500 })
  }
}
