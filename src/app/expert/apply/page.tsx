import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ExpertApplyForm from "@/components/expert/ExpertApplyForm"

export default async function ExpertApplyPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const existing = await prisma.expert.findUnique({
    where: { userId: session.user.id },
  })

  if (existing) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="mono text-xs text-gray-400 uppercase tracking-widest mb-3">application status</p>
        <h1 className="text-3xl font-semibold tracking-tighter mb-3">
          {existing.status === "PENDING" && "Application pending."}
          {existing.status === "APPROVED" && "You're an expert."}
          {existing.status === "DISMISSED" && "Application dismissed."}
        </h1>
        <p className="text-sm text-gray-500">
          {existing.status === "PENDING" && "We'll review your application shortly."}
          {existing.status === "APPROVED" && "Start solving problems and earning."}
          {existing.status === "DISMISSED" && "Contact us if you think this was a mistake."}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8 pb-6 border-b border-black">
        <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-2">expert application</p>
        <h1 className="text-3xl font-semibold tracking-tighter">Apply as an expert.</h1>
        <p className="text-sm text-gray-500 mt-2">
          Get paid to solve problems for builders. Set your own rate and availability.
        </p>
      </div>
      <ExpertApplyForm />
    </div>
  )
}
