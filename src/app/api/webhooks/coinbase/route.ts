import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const event = body.event

    if (event.type === "charge:confirmed") {
      const chargeId = event.data.id
      await prisma.payment.update({
        where: { cryptoChargeId: chargeId },
        data: { status: "CONFIRMED" },
      })
    }

    if (event.type === "charge:failed") {
      const chargeId = event.data.id
      await prisma.payment.update({
        where: { cryptoChargeId: chargeId },
        data: { status: "FAILED" },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
