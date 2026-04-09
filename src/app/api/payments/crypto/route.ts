import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { problemId, amount, expertId } = await req.json()

    const expert = await prisma.expert.findUnique({ where: { id: expertId } })
    if (!expert?.walletAddress)
      return NextResponse.json({ error: "Expert has no wallet address" }, { status: 400 })

    await prisma.payment.upsert({
      where: { problemId },
      update: { status: "PENDING", walletAddress: expert.walletAddress },
      create: {
        problemId,
        userId: session.user.id,
        amount,
        status: "PENDING",
        walletAddress: expert.walletAddress,
      },
    })

    return NextResponse.json({
      contractAddress: process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS,
      expertWallet: expert.walletAddress,
      amount,
      problemId,
    })
  } catch {
    return NextResponse.json({ error: "Failed to init payment" }, { status: 500 })
  }
}
