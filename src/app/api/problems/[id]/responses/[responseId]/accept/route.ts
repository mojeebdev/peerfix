import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; responseId: string }> }
) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id, responseId } = await params

    const problem = await prisma.problem.findUnique({
      where: { id },
      include: { payment: true },
    })
    if (!problem) return NextResponse.json({ error: "Not found" }, { status: 404 })
    if (problem.authorId !== session.user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    await prisma.response.update({
      where: { id: responseId },
      data: { isAccepted: true },
    })

    await prisma.problem.update({
      where: { id },
      data: { status: "SOLVED" },
    })

    const response = await prisma.response.findUnique({
      where: { id: responseId },
    })

    await prisma.user.update({
      where: { id: response!.authorId },
      data: { reputation: { increment: 10 } },
    })

    return NextResponse.json({
      success: true,
      requiresEscrowRelease:
        problem.payment?.method === "CRYPTO" &&
        problem.payment?.status === "CONFIRMED" &&
        !!problem.escrowId,
      escrowId: problem.escrowId,
    })
  } catch {
    return NextResponse.json({ error: "Failed to accept response" }, { status: 500 })
  }
}
