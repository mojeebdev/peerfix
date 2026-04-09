import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendExpertApprovedEmail } from "@/lib/resend"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const { id } = await params
    const { status } = await req.json()

    const expert = await prisma.expert.update({
      where: { id },
      data: { status },
      include: { user: true },
    })

    if (status === "APPROVED") {
      await prisma.user.update({
        where: { id: expert.userId },
        data: { role: "EXPERT" },
      })
      await sendExpertApprovedEmail(expert.user.email!, expert.user.name || "there")
    }

    return NextResponse.json({ expert })
  } catch {
    return NextResponse.json({ error: "Failed to update expert" }, { status: 500 })
  }
}
