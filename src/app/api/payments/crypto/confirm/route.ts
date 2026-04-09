import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { problemId, txHash } = await req.json()

    await prisma.payment.update({
      where: { problemId },
      data: { status: "CONFIRMED", onchainTxHash: txHash },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to confirm" }, { status: 500 })
  }
}
