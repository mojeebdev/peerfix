import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { content } = await req.json()

    const problem = await prisma.problem.findUnique({ where: { id: params.id } })
    if (!problem) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const response = await prisma.response.create({
      data: { content, problemId: params.id, authorId: session.user.id },
    })

    await prisma.problem.update({
      where: { id: params.id },
      data: { status: "IN_PROGRESS" },
    })

    return NextResponse.json({ response }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to post response" }, { status: 500 })
  }
}
